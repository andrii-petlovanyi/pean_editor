import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useGoogleLogin } from "@react-oauth/google";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import { useLogInUserMutation } from "../../redux/api/user.api";
import { useLocalStorage } from "../../hooks";
import { constants } from "../../constants/constants";
import { User } from "../../types";
import { messages } from "../../config";
import { loginSchema } from "./loginSchema";

export const LoginForm: FC = () => {
  const [logInUser, { isLoading }] = useLogInUserMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setToken, setIsExpired } = useLocalStorage(constants.ACCESS_TOKEN);
  const toast = useToast({ variant: "custom" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  async function handleSubmitForm(data: Partial<User>) {
    try {
      const res = await logInUser(data);

      if ("data" in res && res.data.token) {
        setToken(res.data.token);
        reset();
      } else if ("error" in res) {
        const errorMessage =
          (res.error as any).data.message || messages.errors.defaultError;

        toast({
          description: errorMessage,
          duration: 2000,
        });
        setIsExpired(true);
      }
    } catch (error) {
      toast({
        description: messages.errors.defaultError,
      });
    }
  }

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <Stack
      spacing={5}
      as={"form"}
      onSubmit={handleSubmit(handleSubmitForm)}
      width={"100%"}
    >
      <FormControl
        id="nickname"
        isInvalid={!!errors?.nickname}
        position={"relative"}
      >
        <FormLabel>Username</FormLabel>
        <Input type="text" placeholder={"Username"} {...register("nickname")} />
        <FormErrorMessage position="absolute" bottom="-20px">
          {errors?.nickname?.message as string}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        id="password"
        isInvalid={!!errors?.password}
        position={"relative"}
      >
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder={"Password"}
          />
          <InputRightElement>
            <IconButton
              variant={"shadow"}
              aria-label={"Button for show or hide password"}
              fontSize={"18px"}
              icon={showPassword ? <RxEyeOpen /> : <RxEyeClosed />}
              onClick={() => setShowPassword(!showPassword)}
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage position="absolute" bottom="-20px">
          {errors?.password?.message as string}
        </FormErrorMessage>
      </FormControl>
      <Stack spacing={10}>
        <Stack
          direction={{ base: "column", sm: "row" }}
          align={"start"}
          justify={"space-between"}
        >
          <Checkbox colorScheme={"teal"}>Remember me</Checkbox>
          <Link color={useColorModeValue("accentWhite.400", "teal.400")}>
            Forgot password?
          </Link>
        </Stack>
        <Flex direction={"column"} gap={2} justify={"center"}>
          <Button
            bg={useColorModeValue("accentWhite.400", "accentDark.400")}
            color={"white"}
            isLoading={isLoading}
            loadingText={"Verification..."}
            type={"submit"}
            _hover={{
              bg: useColorModeValue("accentWhite.300", "teal.600"),
            }}
          >
            Sign in
          </Button>
          <Text mx={"auto"}>or</Text>
          <Button
            w={"full"}
            maxW={"md"}
            variant={"outline"}
            leftIcon={<FcGoogle />}
            onClick={() => handleGoogleLogin()}
          >
            <Center>
              <Text>Sign in with Google</Text>
            </Center>
          </Button>
        </Flex>
      </Stack>
    </Stack>
  );
};
