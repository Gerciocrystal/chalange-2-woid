import {
  Box,
  Container,
  Text,
  Button,
  VStack,
  useDisclosure,
  useToast,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Header from "../componects/Header";
import moment from "moment";
import Days from "../componects/layout/misselation/Days";
import Task from "../componects/layout/misselation/Task";
import AddTask from "../componects/layout/AddTask";
import { UseAuth } from "../context/AuthProvider/UseAuth";
const Home = () => {
  const today = moment();
  let nextDays = new Array();
  const { onOpen, isOpen, onClose } = useDisclosure();
  for (let i = 0; i < 6; i++) {
    const day = today.clone().add(i, "days");
    const dayName = day.format("dddd");
    const dayId = day.format("DD-MM-YYYY");

    nextDays.push({
      value: dayName,
      id: dayId,
    });
  }
  const [isDayChoosed, setIsDayChoosed] = useState(false);
  const [activeDay, setActionActiveDay] = useState(today);
  const [activeTitle, setActiveTitle] = useState("Choose the Day");
  const { tasksByDay, settasksByDay } = UseAuth();
  const chooseDay = (day) => {
    setIsDayChoosed(true);
    setActiveTitle(day?.value);
    const newDate = moment(day);
    setActionActiveDay(newDate);
    console.log(newDate);
  };
  const Toast = useToast();
  const [tasks, setTasks] = useState([]);
  const handleNEwTask = (newTask) => {
    if (tasks.includes(newTask)) {
      Toast({
        description: "Essa tarefa já existe",
        status: "warning",
        position: "top",
      });
      return;
    }
    let exist = false;
    tasks.forEach((task) => {
      if (task.time === newTask.time) {
        Toast({
          description: "A hora Escolhida já esta ocupada",
          status: "warning",
          position: "top",
        });
        exist = true;
      }
    });
    if (exist) {
      return;
    }

    const temp = tasks;
    temp.push({ ...newTask, dayId: activeDay });
    settasksByDay((prev) => ({ ...prev, ...temp }));
    setTasks(temp);
  };
  const handleGoBack = () => {
    setIsDayChoosed(false);
    setTasks([]);
    setActionActiveDay(today);
  };
  console.log(tasksByDay);
  return (
    <Container
      minW="100%"
      minH="100dvh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
    
      <Box
        background="background"
        minW="360px"
        display="flex"
        flexDir="column"
        borderRadius="xl"
        boxShadow="xl"
      >
        <Header title="Todo List" handleAction={handleGoBack} />
        <VStack alignItems="start" spacing={2} px="15px" pb="25px">
          <Box display="flex" flexDir="column" alignItems="start" my="15px">
            <Text fontSize="xl" color="white" fontWeight="semibold">
              {activeTitle}
            </Text>
            <Text color="font_color">
              {moment(activeDay).format("MMMM DD YYYY")}
            </Text>
          </Box>
          {isDayChoosed ? (
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
          ) : (
            nextDays.length > 0 &&
            nextDays.map((day, index) => (
              <Days
                day={day}
                key={day?.id || index}
                handleFunction={chooseDay}
              />
            ))
          )}
        </VStack>
      </Box>
      <AddTask
        isOpen={isOpen}
        onClose={onClose}
        handleNEwTask={handleNEwTask}
      />
    </Container>
  );
};

export default Home;
