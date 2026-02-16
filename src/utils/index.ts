export function loadImageWithDimensions(src: string): Promise<{ src: string; width: number; height: number }> {
    return new Promise((resolve) => {
        const img = new window.Image();
        img.onload = () => {
            resolve({
                src,
                width: img.naturalWidth,
                height: img.naturalHeight,
            });
        };
        img.onerror = () => {
            resolve({
                src,
                width: 1000,
                height: 750,
            });
        };
        img.src = src;
    });
}