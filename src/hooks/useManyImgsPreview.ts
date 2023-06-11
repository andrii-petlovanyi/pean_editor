import { useEffect, useState } from "react";

export function useManyImagesPreview(files: FileList | null) {
  const [imgsSrc, setImgsSrc] = useState<string[]>([]);

  useEffect(() => {
    if (files && files.length > 0) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setImgsSrc(urls);
    } else {
      setImgsSrc([]);
    }

    return () => {
      imgsSrc.forEach((src) => URL.revokeObjectURL(src));
    };
  }, [files]);

  return imgsSrc;
}
