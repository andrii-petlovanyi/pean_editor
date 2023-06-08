import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Center,
  Checkbox,
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
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import { useLogInUserMutation } from "../../redux/api/user.api";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { constants } from "../../config/constant";
import { User } from "../../types";

const loginSchema = yup.object().shape({
  nickname: yup
    .string()
    .trim()
    .min(3, "Minimal username length is 3 symbols")
    .max(32, "Max username length is 32 symbols")
    .required("Username is required"),
  password: yup
    .string()
    .trim()
    .min(8, "Minimal password length is 8 symbols")
    .max(32, "Max password length is 32 symbols")
    .required("Password is required"),
});

export const LoginForm = (): JSX.Element => {
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
          (res.error as any).data.message ||
          "Something went wrong... Unknown error occurred";

        toast({
          description: errorMessage,
          duration: 2000,
        });
        setIsExpired(true);
      }
    } catch (error) {
      toast({
        description: "Something went wrong",
      });
    }
  }

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
        <Stack spacing={2} justify={"center"}>
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
          <Text textAlign={"center"}>or</Text>
          <Button w={"full"} variant={"outline"} leftIcon={<FcGoogle />}>
            <Center>
              <Text>Sign in with Google</Text>
            </Center>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
