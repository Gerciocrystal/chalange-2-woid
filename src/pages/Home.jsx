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
import React, { useEffect, useState } from "react";
import Header from "../componects/Header";
import moment from "moment";
import elipse_2 from "../assets/images/Ellipse 2.png";
import elipse_1 from "../assets/images/Ellipse 3.png";
import Task from "../componects/layout/misselation/Task";
import AddTask from "../componects/layout/AddTask";
import { UseAuth } from "../context/AuthProvider/UseAuth";
import DaysWrapper from "../componects/layout/DaysWrapper";
import TaskWrapper from "../componects/layout/TaskWrapper";
const Home = () => {
  const today = moment();
  const [isDayChoosed, setIsDayChoosed] = useState(false);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [activeDay, setActionActiveDay] = useState(today);
  const [activeTitle, setActiveTitle] = useState("Choose the Day");
  const { tasksByDay, settasksByDay } = UseAuth();
  const chooseDay = (day) => {
    setIsDayChoosed(true);
    setActiveTitle(day?.value);
    setActionActiveDay(moment(day?.id).format("MM-DD-YYYY"));
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
    temp.push({ ...newTask, dayId: activeDay, done: false });
    settasksByDay((prev) => [
      ...prev,
      { ...newTask, dayId: activeDay, done: false },
    ]);
    setTasks(temp);
  };
  const handleGoBack = () => {
    setIsDayChoosed(false);
    setTasks([]);
    setActionActiveDay(today);
  };
  useEffect(() => {
    const handleTask = () => {
      tasksByDay.map((taskDay) => {
        if (taskDay.dayId === activeDay) {
          console.log("entrei");
          setTasks((prev) => [...prev, taskDay]);
        }
      });
    };
    handleTask();
  }, [activeDay]);
  return (
    <Container
      minW="100%"
      minH="100dvh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Image
        src={elipse_2}
        boxSize="80%"
        position="absolute"
        top={0}
        left={0}
      />
      <Image
        src={elipse_1}
        boxSize="360px"
        position="absolute"
        top={0}
        right={0}
      />
      <Box
        zIndex={9}
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
            <TaskWrapper tasks={tasks} onOpen={onOpen} />
          ) : (
            <DaysWrapper chooseDay={chooseDay} />
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
