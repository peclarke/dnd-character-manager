// import { hash } from 'bcryptjs';

// state management
// import { useContext } from 'react';
// import { AppState } from '../main';
import { AppStateType } from '../store/model';



// globals
const TIME_DELAY = 3; // seconds

type ContextState = {
    fullState: AppStateType;
    setState:  (state: AppStateType) => void;
}

export const hashFunc = async (func: (_: any) => any) => {
    const functionFormat = func.toString();
    // return await hash(functionFormat, 1)
    return await functionFormat;
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
export const SaveWrapper = async (func: (_: any) => any, { fullState }: ContextState): Promise<Record<string, number>> => {
    return await hashFunc(func).then(hash => {
        const epochSeconds = Math.floor(Date.now() / 1000); // https://stackoverflow.com/questions/221294/how-do-i-get-a-timestamp-in-javascript
    
        const updatedQueue = {
            ...fullState.actionQueue,
            [hash]: epochSeconds
        }

        return updatedQueue;
    });
}

/**
 * The function that is called after a specific time delay. Will check
 * if the epoch time is actually greater than or equal to the time delay.
 * If it is, it will initiate an upload to firestore.
 * @param hash 
 */
export const validateHashTime = (hash: string, queue: Record<string, number>) => {
    // problem: its using the queue that we give it, which is wrong.

    // console.log(Object.values(queue))
    const actionEpochTime  = queue[hash];
    const currentEpochTime = Math.floor(Date.now() / 1000);

    // console.log(Object.values(queue), currentEpochTime)

    // if (currentEpochTime >= actionEpochTime) {
    //     console.log("TRUE")
    // } else {
    //     console.log("FALSE")
    // }


    // console.log(actionEpochTime)
    // uploadState() if conditions are ok


    // delete queue[hash];
}