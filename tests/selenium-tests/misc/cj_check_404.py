import requests

## Headers for the data (CSV)
## USA Link,Title,URL,CJ URL,Exists (Previous Run),Exists (Current Run),Changed,Connection Status,Ever Existed

class Check_CJ_Links( object ):

    def __init__( self, filename=r"storage.txt" ):
        self.filename = filename
        self.headers  = list( self._create_default_dict().keys() )

    def _create_default_dict( self ):
        ''' Create a default dictionary with set keys '''
        cj_dict = { 'USA Link'              : '',
                    'Title'                 : '',
                    'URL'                   : '',
                    'CJ URL'                : '',
                    'Exists (Previous Run)' : '',
                    'Exists (Current Run)'  : '',
                    'Changed'               : '',
                    'Connection Status'     : '',
                    'Ever Existed'          : '',
                }
        return cj_dict

    def read_text( self ):
        ''' Get data stored in the text file and return it as a list.
            Each list item will contain a whole row of data as one long string
        '''
        file = open( self.filename )
        data = file.readlines()

        count = 0
        for item in data:
            data[count] = item.strip( '\n' )
            count += 1
        return data

    def _format_exists( self, line_dict ):
        ''' This is data from the last run so
            move current run into previous run and clear current run
        '''
        line_dict['Exists (Previous Run)'] = line_dict.get( 'Exists (Current Run)' )
        line_dict['Exists (Current Run)']  = ''
        return line_dict

    def format_data( self, data ):
        ''' Format each long string in the list by comma separated values
            and place into dict of pre-defined keys
            returns list of dicts
        '''
        data_list = []
        line_dict = self._create_default_dict()
        line      = ''

        for item in data:
            item = list( item )

            count = 0
            for character in item:
                if character != ',':
                    line += character
                else:
                    line_dict[ self.headers[count] ] = line
                    count += 1
                    line = ''

            line_dict = self._format_exists( line_dict )
            data_list.append( line_dict )
            line_dict = self._create_default_dict()

        return data_list

    def write_to_file( self, data ):
        ''' Write data list line by line to a text file for future use '''
        file = open( self.filename, 'w')
        #file = open( r"storage2.txt", 'w' )

        for item in data:
            s = ''
            for k in item.values():
                s += k
                s += ','
            file.write( "{0}\n".format( s ) )
        file.close()

    def _update_exists( self, report ):
        ''' If link is found (Status code 200) return yes if not return no '''
        if report == "200":
            return 'yes'
        return 'no'

    def _update_change( self, item ):
        ''' Update Changed key if there is a difference between this run and last run '''
        if item.get( 'Exists (Previous Run)' ) != item.get( 'Exists (Current Run)' ):
            return 'yes'
        return 'no'

    def update_ever_existed( self, data ):
        ''' Update Ever Existed column '''
        for item in data:
            if item.get( 'Changed' ) == 'yes':
                if item.get( 'Ever Existed' ) == 'no':
                    item['Ever Existed'] = 'yes'
        return data

    def get_url_results( self, data ):
        ''' Check if CJ URL exists and update dict values based upon the results '''
        count = 0
        total = len( data )

        for item in data:
            try:
                r = requests.get( item.get( 'CJ URL') )
                report = str( r.status_code )
            except Exception as e:
                report = 'connection error'

            data[count]['Exists (Current Run)'] = self._update_exists( report )
            data[count]['Changed'] = self._update_change( item )
            data[count]['Connection Status'] = report

            count += 1
            print( "({0} of {1}) {2}: {3}".format( count, total, item.get( 'CJ URL' ), report ) )

        return data

    def find_differences( self, data ):
        ''' If changes in link status are found return a list of those items '''
        changes = []

        for item in data:
            if item.get( 'Changed' ) == 'yes':
                if item.get( 'Ever Existed' ) == 'no':
                    status = 'new'
                else:
                    status = 'changed'
                item['Status'] = status
                changes.append( item )
        return changes

    def print_differences( self, changes ):
        ''' Print out changes that were found and how they changed '''
        print( '\n###############################' )
        print( 'First time page has been found!' )
        for item in changes:
            if item.get( 'Status' ) == 'new':
                print( 'Agency Page: {0} ({1}) needs to be updated.'.format( item.get( 'Title' ), item.get( 'CJ URL' ) ) )

        print( '\n###############################' )
        print( 'Pages that were previously found but now cannot be found.' )
        for item in changes:
            if item.get( 'Status' ) == 'changed' and item.get( 'Exists (Current Run)' ) == 'no':
                print( 'Agency Page: {0} ({1}) now not found.'.format( item.get( 'Title' ), item.get( 'CJ URL' ) ) )

        print( '\n###############################' )
        print( 'Trouble pages that existed in the past and were found again during this run.')
        for item in changes:
            if item.get( 'Status' ) == 'changed' and item.get( 'Exists (Current Run)') == 'yes':
                print( 'Agency Page: {0} ({1}) found again.'.format( item.get( 'Title' ), item.get( 'CJ URL' ) ) )

    def remove_status_key( self, data ):
        ''' Remove status changes from dicts as they are not needed when writing results in text file '''
        for item in data:
            if item.get( 'Status' ):
                item.pop( 'Status', None )
        return data


def main_run( filename ):
    cj = Check_CJ_Links( filename=filename )

    data = cj.read_text()
    data = cj.format_data( data )
    data = cj.get_url_results( data )
    # for i in data:
    #     print(i)

    changes = cj.find_differences( data )
    if changes:
        cj.print_differences( changes )

    data = cj.update_ever_existed( data )
    data = cj.remove_status_key( data )
    # for i in data:
    #     print(i)

    cj.write_to_file( data )


main_run( filename=r"storage.txt" )
