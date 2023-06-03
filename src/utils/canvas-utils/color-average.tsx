
/**
 * Gets the average RGB color of an ImageData object.
 * Returns a vector with three elements representing RGB values
 */
export function getRgbAverage(imageData: ImageData): [number, number, number] {
    const componentCnt = imageData.data.length;
    const noPixels = componentCnt / 4;

    let R = 0, G = 0, B = 0;

    for (let i = 0; i < componentCnt; i+=4) {
        const r = imageData.data[i];
        const g = imageData.data[i+1];
        const b = imageData.data[i+2];
        
        R += r;
        G += g;
        B += b;
    }

    R = R / noPixels;
    G = G / noPixels;
    B = B / noPixels;

    return [R, G, B]
}

/**
 * Gets the average RGBA color of an ImageData object.
 * Returns a vector with three elements representing RGBA values
 */
export function getRgbaAverage(imageData: ImageData): [number, number, number, number] {
    const componentCnt = imageData.data.length;
    const noPixels = componentCnt / 4;

    let R = 0, G = 0, B = 0, A = 0;

    for (let i = 0; i < componentCnt; i+=4) {
        const r = imageData.data[i];
        const g = imageData.data[i+1];
        const b = imageData.data[i+2];
        const a = imageData.data[i+3];
        
        R += r;
        G += g;
        B += b;
        A += a;
    }

    R = R / noPixels;
    G = G / noPixels;
    B = B / noPixels;
    A = A / noPixels / 255;

    return [R, G, B, A]
}