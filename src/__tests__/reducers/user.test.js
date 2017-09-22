import { user } from '../../reducers/user';

describe('reducers', () => {
    const action = {
        type: 'LOAD_USER',
        payload: {
            name: 'dilbert',
            username: 'db1',
            devMode: true
        }
    };

    beforeEach(() => {
        return {
            action
        };    
    });
    
    it('should return correct user state', () => {
        let initialState = {};
        let result = user (initialState, action);
        let expectedPropertyLength = Object.keys(action.payload).length;

        expect(result).toBe(action.payload); 
        expect(result.name).toEqual(action.payload.name);       
        expect(Object.keys(result)).toHaveLength(expectedPropertyLength);
    });    
});

