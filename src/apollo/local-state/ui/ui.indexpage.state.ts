import { makeVar } from "@apollo/client";
import { CanvasBackgrounds } from "canvas";
import { CanvasBackgroundFunction } from "canvas/backgrounds";
import { makePVar } from "../persistent-var";

// Immutable list of named backgrounds
const BACKGROUND_LIST: { [name: string]: CanvasBackgroundFunction } = {
  "Ambience": CanvasBackgrounds.BlurryMovingCirclesBackground,
  "Space": CanvasBackgrounds.SpaceBackground
}

const DEFAULT_BACKGROUND = "Ambience"

export const reactiveVars = {
  indexBackground: makePVar(DEFAULT_BACKGROUND, "ui.indexpage.indexBackground")
}

export function SetIndexBackground(name: string){
  if (!BACKGROUND_LIST[name]){
    reactiveVars.indexBackground(DEFAULT_BACKGROUND);
    return;
  }
  
  reactiveVars.indexBackground(name);
}

export function GetBackgrounds(){
  return BACKGROUND_LIST
}

export function GetBackgroundFn(name: string){
  return BACKGROUND_LIST[name]
}