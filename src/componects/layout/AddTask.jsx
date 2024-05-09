import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Input,
  ModalOverlay,
  Button,
  FormControl,
  FormLabel,
  ModalFooter,
  useToast,
  ModalHeader,
} from "@chakra-ui/react";

const AddTask = ({ isOpen, onClose, handleNEwTask }) => {
  const [newTask, setNewTast] = useState({
    value: "",
    time: "",
  });
  const Toast = useToast();
  const onSubmit = () => {
    if (
      newTask.value == "" ||
      newTask.time == "" ||
      newTask.value == undefined ||
      newTask.time == undefined
    ) {
      Toast({
        description: "Prencha todos os campos",
        status: "warning",
      });
      return;
    }
    handleNEwTask(newTask);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Nova Tarefa</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Tarefa</FormLabel>
            <Input
              value={newTask.value}
              onChange={(e) => {
                setNewTast((prev) => ({ ...prev, value: e.target.value }));
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Hora</FormLabel>
            <Input
              value={newTask.time}
              type="time"
              onChange={(e) => {
                console.log(e.target.value);
                setNewTast((prev) => ({ ...prev, time: e.target.value }));
              }}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onSubmit}
            background="primary"
            color="white"
            transition="all .3s ease"
            _hover={{
              background: "primary",
              color: "white",
            }}
          >
            Adicionar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

AddTask.propTypes = {};

export default AddTask;
