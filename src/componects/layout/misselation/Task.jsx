import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, HStack, Radio, Switch, Text } from "@chakra-ui/react";
import moment from "moment";

const Task = ({ task }) => {
  const [done, setDone] = useState(false);
  return (
    <Box
      //   onClick={() => (done ? console.log("precionado") : setDone(true))}
      htmlFor={task?.value}
      background={done ? "inative_background" : "component"}
      p={3}
      w="100%"
      borderRadius="base"
      opacity={done ? "0.6" : "1"}
      textAlign="start"
      transition="all .2s ease"
      _hover={{
        cursor: "pointer",
        transform: "scale(1.02)",
      }}
      display="flex"
      justifyContent="space-between"
    >
      <HStack>
        <Switch
          id={task.value}
          value={done}
          onChange={(e) => setDone(e.target.checked)}
        />
        <Text
          color="font_color"
          htmlFor={task?.value}
          textDecor={done && "line-through"}
        >
          {task?.value || "Today"}
        </Text>{" "}
      </HStack>
      <Text color="font_color">{task?.time}</Text>
    </Box>
  );
};

Task.propTypes = {};

export default Task;
