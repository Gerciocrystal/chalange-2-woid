import React from "react";
import PropTypes from "prop-types";
import { Box, Button, IconButton, Text } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";

const Header = ({ title, handleAction }) => {
  return (
    <Box
      display="flex"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      background="primary"
      px="15px"
      borderTopLeftRadius="lg"
      borderTopRadius="lg"
      py="35px"
    >
      <Text
        transition="all .2s ease"
        _hover={{
          cursor: "pointer",
          fontWeight: "bold",
          transform: "scale(1.01)",
          fontSize: "lg",
        }}
        onClick={handleAction}
      >
        <IoIosArrowBack />
      </Text>

      <Text fontSize="xl">{title}</Text>
      <HiDotsVertical />
    </Box>
  );
};

Header.propTypes = {};

export default Header;
