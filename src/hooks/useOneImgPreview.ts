import { useEffect, useState } from "react";

export function useOneImgPreview(file: FileList | null) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    if (file && file[0]) {
      const url = URL.createObjectURL(file[0]);
      setImgSrc(url);
    } else {
      setImgSrc(null);
    }

    return () => {
      if (imgSrc) {
        URL.revokeObjectURL(imgSrc);
      }
    };
  }, [file]);

  return imgSrc;
}
