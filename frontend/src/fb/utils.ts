import { hash } from 'bcryptjs';

// state management
import { useContext } from 'react';
import { AppState } from '../main';

// globals
const TIME_DELAY = 30; // seconds

export const hashFunc = async (func: (_: any) => any) => {
    const functionFormat = func.toString();
    // return createHash("sha256").update(functionFormat).digest("hex");
    return await hash(functionFormat, 1)
}

/**
 * For every interaction the user makes on the app that changes the firestore,
 * this function should be called. 
 * 
 * The idea is that after an interaction occurs, after a certain amount of time delay,
 * a callback occurs to upload the new state to the firestore. This time delay allows
 * limits any huge number of requests that are sent to the cloud. The theory behind this
 * is that after the time delay, if the user has not updated anything we can safely upload it
 * 
 * For each interaction, the function is hashed and is saved to the app state. The format of save
 * is a map in which the key is the function hash and the value is the current timestamp. After
 * the time delay callback occurs, it gets the timestamp that is associated with the hashed function.
 * If this time stamp is the greater or equal to the delay, then the save happens.
 * 
 * If multiple interactions occur with the same function, the most recent timestamp is saved to the map
 * with the function hash. Meaning, the oldest callbacks will check the map and find the timestamp to be
 * below that of the time delay. Nothing will happen until the newest callback checks and finds the time
 * delay to be greater to equal.
 * @param func 
 */
export const SaveWrapper = (func: (_: any) => any) => {
    const { fullState, setState } = useContext(AppState);

    hashFunc(func).then(hash => {
        const epochSeconds = Math.floor(Date.now() / 1000); // https://stackoverflow.com/questions/221294/how-do-i-get-a-timestamp-in-javascript
    
        // save to app state
        setState({
            ...fullState,
            actionQueue: {
                ...fullState.actionQueue,
                [hash]: epochSeconds
            }
        });
    
        // initiate callback
        setTimeout(() => validateHashTime(hash), TIME_DELAY * 1000); // 30s * 1000 = 30,000ms
    });
}

/**
 * The function that is called after a specific time delay. Will check
 * if the epoch time is actually greater than or equal to the time delay.
 * If it is, it will initiate an upload to firestore.
 * @param hash 
 */
const validateHashTime = (hash: string) => {
    const { fullState } = useContext(AppState);
    const actionEpochTime = fullState.actionQueue.get(hash);


    // uploadState() if conditions are ok
}

/**
 * Upload the current application state to firestore.
 * This is ONLY run if all the conditions are met. Specifically,
 * the action queue epoch time must be greater than or equal to the
 * time delay for that specific action.
 */
const uploadState = () => {

}