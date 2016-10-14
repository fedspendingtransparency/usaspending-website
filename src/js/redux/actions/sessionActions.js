export const setSession = (state) => ({
	type: 'SET_SESSION',
	login: state.login,
	user: state.user,
	admin: state.admin,
	skipGuide: state.user.skip_guide
})

export const setApiMeta = (state) => ({
	type: 'SET_API_META',
	time: state.time
})