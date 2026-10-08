/**
 * NLAnimatedTour.js
 * Created by Nick Torres 10/6/2026
 */

import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const animatedTour = driver({
    stagePadding: 20,
    popoverClass: 'nl-theme',
    showProgress: true,
    steps: [
        { element: '#animated-tour-step1', popover: { title: 'Search your way', description: 'Toggle between our Advanced Search Filters or AI-powered Smart Assist. Both give you the same data.', side: "right", align: 'start', showButtons: ["next"] }},
        { element: '#animated-tour-step2', popover: { title: 'Begin your search', description: 'Begin typing your government spending question or use one of our examples above to help you get started. Ask your government spending questions in your own words, then click Search.', side: "right", align: 'center' }},
        { element: '#animated-tour-step3', popover: { title: 'Not sure what to ask?', description: 'Try one of our example prompts to start your search.', side: "right", align: 'center' }},
        { element: '#animated-tour-step4', popover: { title: 'Understanding terminology', description: 'Access the glossary any time to look up terms you don/`t recognize.', side: "top", align: 'center' }},
        { element: '#animated-tour-step5', popover: { title: 'Need more help?', description: 'Explore articles and resources to learn more about Smart Assist.', side: "bottom", align: 'center' }}
    ]
});

export default animatedTour;