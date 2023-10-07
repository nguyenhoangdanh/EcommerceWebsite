// const { CloseButton, Group, Box, Text, Modal, Button, Image  } = MantineCore;
// const { useFormContext } = Form;
// const {useState} = React
import {
  CloseButton,
  Group,
  Box,
  Text,
  Modal,
  Button,
  Image,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import { useState } from "react";
import '@mantine/core/styles/Button.css';
function ManualCase() {
  //   const { screenId, ctx } = useFlowViewer();
  //   const { setValue, unregister, watch } = useFormContext();
  //   const caseInfo = watch()[screenId];

  //   const { onSubmit} = useScreenActions()

  const [opened, setOpen] = useState(false);
  const theme = createTheme({
    primaryColor: 'orange',
    defaultRadius: 0,
    
    
  });
  const handleSUbmit = () => {
    // unregister(["mainService", "subService", "riskLevel", "channel", "caseType", "assignedTo"])
    // setValue(`${screenId}`, {
    //   ...caseInfo,
    //   confirmExit: true
    // })
    setOpen(false);
    // onSubmit()
  };

  const [hover, setHover] = useState(false);

  return (

    <div style={{flex:1, justifyContent:'center', alignItems:'center', marginLeft:600}}>
      <MantineProvider theme={theme} >
      <Box maw={500} p="md" mx="auto" bg="var(--mantine-color-blue-light)">
        <CloseButton
          onClick={() => setOpen(true)}
          radius="sm"
          size="sm"
          w="sm"
          h="sm"
          c="black"
          variant="transparent"
        />
        <Modal
          opened={opened}
          onClose={() => setOpen(false)}
          title="Authentication"
          zIndex="10000"
          style={{justifyContent:'center', alignItems:'center', marginLeft:500, backgroundColor:'red', width:600, height:300, borderRadius:5}}
        >
          <Text>Authenticated</Text>
          <Image
            radius="sm"
            style={{width:200, height:100}}
            src="https://nflow.staging.nuclent.com/v1/assets/67/mda_dAQme95YrqvABaSB8aAkZ4"
          />
          <Group style={{justifyContent:'center', alignItems:'center',width: 500, height:100,}}>
            <Button
              onClick={() => setOpen(false)}
              title="Cancel"
              // size="xl"
              // h={100}
              // w="auto"
              c='white'
              style={{backgroundColor: 'lightgray', width:200, height:40, position:'absolute',}}
            >
              <Text style={{color: 'black', fontWeight:500,}}>Cancel</Text>
            </Button>
            <Button onClick={handleSUbmit}
            style={{backgroundColor:'#7b68ee', width:200, height:40, left:250}} >
            <Text style={{color: 'white',fontWeight:500}}>Confirm</Text>
            </Button>
          </Group>
        </Modal>
      </Box>
      </MantineProvider>
    </div>
  );
}
export default ManualCase;
