import { useToast } from "@chakra-ui/react";

export const useRequest = (requestFn: (data: any) => Promise<any>) => {
  const toast = useToast({ variant: "custom" });

  const handleRequest = async (data: any) => {
    try {
      const response = await requestFn(data);
      if ("data" in response) {
        toast({ description: response.data.message });
      }
      if ("error" in response) {
        toast({ description: response.error.data.message });
      }
    } catch (error: Error | any) {
      toast({ description: JSON.stringify(error.message) });
    }
  };

  return handleRequest;
};
