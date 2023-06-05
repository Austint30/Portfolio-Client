import { makeVar, ReactiveVar } from "@apollo/client";

const KEY = 'persistent-state';

/**
 * Wrapper around Apollo Client's makeVar function. Adds persistence to this variable using localStorage.
 * @param value Initial value of variable
 * @param vName Name of variable in localStorage
 * @returns {ReactiveVar<T>}
 */
export function makePVar<T>(value: T, vName: string): ReactiveVar<T> {

  // Initialize storage
  let storageValue = get();
  if (storageValue === undefined){
    storageValue = value
    set(storageValue);
  }

  // If value in storage is not the same as value
  if (storageValue !== value){
    value = storageValue;
  }

  const _var = makeVar(value);
  
  // Respond to localstorage changes when a different tab changes the persisted state
  window.addEventListener('storage', () => {
    let newValue = get();
    let lastValue = _var();
    if (newValue !== lastValue){
      _var(newValue);
    }
  })

  function getStorage(){
    try {
      let obj = JSON.parse(window.localStorage.getItem(KEY) || '{}');
      if (typeof obj !== 'object' || obj === null || obj === undefined){
        obj = {};
      }
      return obj;
    }
    catch (err){
      console.warn(`Failed to parse '${KEY}' localStorage value`);
      return {}
    }
  }

  function setStorage(newStorage: any){
    let storage = getStorage();
    let mergedStorage = {
      ...storage,
      ...newStorage
    }
    window.localStorage.setItem(KEY, JSON.stringify(mergedStorage));
  }

  function get(): T{
    let storage = getStorage();
    return storage[vName];
  }

  function set(newValue: T){
    setStorage({ [vName]: newValue })
  }

  const rv: ReactiveVar<T> = function(newValue){
    

    if (arguments.length > 0){
      newValue = _var(newValue!);
      set(newValue!);
      return newValue;
    }

    return _var();
  }

  rv.onNextChange = _var.onNextChange
  rv.attachCache = _var.attachCache
  rv.forgetCache = _var.forgetCache

  return rv
}