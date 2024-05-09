import React from "react";
import PropTypes from "prop-types";
import Task from "./misselation/Task";
import { Button, Text } from "@chakra-ui/react";

const TaskWrapper = ({ tasks, onOpen }) => {
  return (
    <>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <Task task={task} key={task?.id || `${index}_Tasts`} />
        ))
      ) : (
        <Text>Sem Tarefas</Text>
      )}
      <Button
        background="primary"
        color="black"
        borderRadius="full"
        fontWeight="bold"
        fontSize="1.6rem"
        height="45px"
        alignSelf="end"
        transition="all .3s ease"
        mt="52px"
        _hover={{
          background: "primary",
          color: "white",
        }}
        onClick={onOpen}
      >
        +
      </Button>
    </>
  );
};

TaskWrapper.propTypes = {
  tasks: PropTypes.array,
};

export default TaskWrapper;
