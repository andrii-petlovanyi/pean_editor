import { useEffect, useState } from "react";

export function useImgPreview(file: FileList | null) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    if (file && file[0]) {
      const newUrl = URL.createObjectURL(file[0]);

      if (newUrl !== imgSrc) {
        setImgSrc(newUrl as string);
      }
    }
  }, [file]);

  return [imgSrc, setImgSrc];
}
