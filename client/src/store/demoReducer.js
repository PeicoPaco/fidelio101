export const initialState = {
    allNames: []
};
const demoReducer = (state = { ...initialState }, action) => {
    switch (action.type) {
        case 'DEMO':
            return {
                allNames: state.allNames.concat(action.name)
            };
        default:
            return state;
    }
};
export default demoReducer;
