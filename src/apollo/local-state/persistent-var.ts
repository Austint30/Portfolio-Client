import { makeVar, ReactiveVar } from "@apollo/client";

const KEY = 'persistent-state';

/**
 * Wrapper around Apollo Client's makeVar function. Adds persistence to this variable using localStorage.
 * @param value Initial value of variable
 * @param vName Name of variable in localStorage
 * @returns {ReactiveVar<T>}
 */
export function makePVar<T>(value: T, vName: string): ReactiveVar<T> {
  let _var = makeVar(value);
  let loaded = false;

  let initStorage = getStorage();
  initStorage[vName] = value;


  function getStorage(){
    try {
      let obj = JSON.parse(localStorage.getItem(KEY) || '{}');
      if (typeof obj !== 'object'){
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
    localStorage.setItem(KEY, JSON.stringify(mergedStorage));
  }

  function get(): T{
    let storage = getStorage();
    return storage[vName];
  }

  function set(newValue: T){
    setStorage({ [vName]: newValue })
  }

  const rv: ReactiveVar<T> = function(newValue){
    

    newValue = _var(newValue);
    if (arguments.length > 0){
      // Set value
      set(newValue);
      value = newValue!;
    }
    else if (!loaded)
    {
      let storageValue = get();
      if (storageValue === undefined){
        storageValue = value
        set(storageValue);
      }
      value = storageValue;
      _var(value);
      loaded = true;
    }
    return value;
  }

  rv.onNextChange = _var.onNextChange
  rv.attachCache = _var.attachCache
  rv.forgetCache = _var.forgetCache

  return rv
}