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
import { Image, useColorMode } from "@chakra-ui/react";
import clsx from "clsx";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import ventum_logo from "../../../assets/ventum_logo.png";

const Login = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  console.log("baseUrl", baseUrl);

  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const showToast = useToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [loginValue, setLoginValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const request = await fetch(`${baseUrl}/accounts/log-in`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: loginValue,
          password: passwordValue,
          deviceId: "string11",
          token: "string",
          language: "uz",
        }),
      });

      if (!request.ok) {
        showToast({
          title: "Xatolik",
          description: "Login yokida Parol xato",
          status: "error",
          position: "top",
        });
        return;
      }
      const response = await request.json();
      console.log("response::::", response);

      navigate("/dashboard");
    } catch (error: unknown) {
      showToast({
        title: "Xatolik",
        description: "Login yokida Parol xato",
        status: "error",
        position: "top",
      });
      console.log(error);
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
      >
        <Image src={ventum_logo} w="full" h="full" border="none" />
      </Box>
    </Box>
  );
};

export default Login;
