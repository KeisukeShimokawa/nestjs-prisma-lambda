import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const AuthScreen = () => {
  const [formState, setFormState] = useState<FormState | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-expect-error 型エラーは一旦無視
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ formState });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <VStack spacing="24px">
          <Box>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              onChange={handleInput}
            />
          </Box>
          <Box>
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              onChange={handleInput}
            />
          </Box>
          <Box>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={handleInput}
            />
          </Box>
          <Box>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={handleInput}
            />
          </Box>
          <Box>
            <Button type="submit">Submit</Button>
          </Box>
        </VStack>
      </FormControl>
    </form>
  );
};
