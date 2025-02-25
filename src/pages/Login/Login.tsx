import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  ViewIcon,
  ViewOffIcon,
  Button,
} from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";
import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { setCookie } from "../../lib/actions";
import { LoginSuccessType, LoginRequestType } from "../../types/accounts";

const Login = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const { sendData } = useFetch();

  const [showPassword, setShowPassword] = useState<boolean>(!false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [loginValue, setLoginValue] = useState<string>("Bugalter");
  const [passwordValue, setPasswordValue] = useState<string>("123");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const response = await sendData<LoginSuccessType, LoginRequestType>({
        url: `${baseUrl}/accounts/login`,
        data: { login: loginValue, password: passwordValue },
        method: "POST",
        success_message: undefined,
        error_message: undefined,
      });

      setCookie("access_token", response.data.token);
      setCookie("get_me", JSON.stringify(response.data.employee));
      setCookie("job_title", response.data.employee.jobTitle);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Box as="div" className="flex justify-between items-stretch">
      <Box className="flex-1 flex justify-center items-center h-screen">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <Box as="div">
            <Text fontWeight={"bold"} fontSize={"3xl"}>
              Kirish
            </Text>
            <Text className="text-gray-400">
              Kirish uchun login va parolni kiriting!
            </Text>
          </Box>
          <FormControl isRequired>
            <FormLabel>Login</FormLabel>
            <Input
              value={loginValue}
              onChange={(e) => setLoginValue(e.currentTarget.value)}
              borderRadius={"xl"}
              type="text"
              placeholder="Login"
              border={"1px"}
              borderColor={"gray.400"}
              className={clsx(
                colorMode === "light" ? "bg-white" : "bg-gray-800"
              )}
            />
          </FormControl>
          <FormControl isRequired position="relative">
            <FormLabel>Parol</FormLabel>
            <Input
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.currentTarget.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Parol"
              borderRadius={"xl"}
              border={"1px"}
              borderColor={"gray.400"}
              className={clsx(
                colorMode === "light" ? "bg-white" : "bg-gray-800"
              )}
            />
            <Box
              as="div"
              display={"grid"}
              placeContent={"center"}
              position={"absolute"}
              className={clsx(
                colorMode === "light" ? "bg-gray-200" : "bg-gray-800"
              )}
              bottom={0}
              right={0.5}
              height={9}
              my="0.5"
              px={3}
              borderRadius={"xl"}
              zIndex={10}
            >
              {showPassword ? (
                <ViewOffIcon
                  className="text-sm cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              ) : (
                <ViewIcon
                  className="text-sm cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              )}
            </Box>
          </FormControl>
          <Button
            isLoading={isPending}
            loadingText="Yuklanmoqda"
            textAlign="center"
            borderRadius={"2xl"}
            type="submit"
            colorScheme="blue"
          >
            Kirish
          </Button>
        </form>
      </Box>
      <Box
        as="div"
        className="flex-1 hidden lg:grid place-content-center bg-white h-screen rounded-bl-[25%]"
      ></Box>
    </Box>
  );
};

export default Login;
