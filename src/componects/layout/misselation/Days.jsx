import React from "react";
import PropTypes from "prop-types";
import { Box, Text } from "@chakra-ui/react";

const Days = ({ day, handleFunction }) => {
  return (
    <Box
      onClick={() => handleFunction(day)}
      background="component"
      p={3}
      w="100%"
      textAlign="start"
      transition="all .2s ease"
      _hover={{
        cursor: "pointer",
        transform: "scale(1.02)",
        fontWeight: "bold",
      }}
    >
      <Text color="font_color">{day?.value || "Today"}</Text>
    </Box>
  );
};

Days.propTypes = {};

export default Days;
