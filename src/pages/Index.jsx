import React, { useState } from "react";
import { Container, Table, Thead, Tbody, Tr, Th, Td, Button, IconButton, Input, VStack, HStack, FormControl, FormLabel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Select, Checkbox } from "@chakra-ui/react";
import { FaTrash, FaPlus, FaEye } from "react-icons/fa";

const initialMaterials = [
  {
    Material_Number: "MAT001",
    Description: "Material 1",
    Unit_Of_Measure: "kg",
    Material_Group: "Group 1",
    Material_Type: "Type 1",
    Plant: "Plant 1",
    Storage_Location: "Loc 1",
    Valuation_Class: "Class 1",
    Standard_Price: 100.0,
    Moving_Average_Price: 95.0,
    Weight: 10.0,
    Volume: 5.0,
    Hazardous_Indicator: false,
  },
  // Add more initial materials if needed
];

const Index = () => {
  const [materials, setMaterials] = useState(initialMaterials);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newMaterial, setNewMaterial] = useState({
    Material_Number: "",
    Description: "",
    Unit_Of_Measure: "",
    Material_Group: "",
    Material_Type: "",
    Plant: "",
    Storage_Location: "",
    Valuation_Class: "",
    Standard_Price: 0,
    Moving_Average_Price: 0,
    Weight: 0,
    Volume: 0,
    Hazardous_Indicator: false,
  });

  const handleDelete = (materialNumber) => {
    setMaterials(materials.filter((material) => material.Material_Number !== materialNumber));
  };

  const handleAddMaterial = () => {
    setMaterials([...materials, newMaterial]);
    onClose();
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedMaterials = [...materials].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredMaterials = sortedMaterials.filter((material) => Object.values(material).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())));

  return (
    <Container maxW="container.xl" py={6}>
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <Input placeholder="Search materials..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={onOpen}>
            Add Material
          </Button>
        </HStack>
        <Table variant="simple">
          <Thead>
            <Tr>
              {["Material_Number", "Description", "Unit_Of_Measure", "Material_Group", "Material_Type", "Plant", "Storage_Location", "Valuation_Class", "Standard_Price", "Moving_Average_Price", "Weight", "Volume", "Hazardous_Indicator"].map((key) => (
                <Th key={key} onClick={() => handleSort(key)} cursor="pointer">
                  {key.replace(/_/g, " ")}
                </Th>
              ))}
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredMaterials.map((material) => (
              <Tr key={material.Material_Number}>
                {Object.values(material).map((value, index) => (
                  <Td key={index}>{value.toString()}</Td>
                ))}
                <Td>
                  <HStack spacing={2}>
                    <IconButton aria-label="View" icon={<FaEye />} size="sm" colorScheme="blue" />
                    <IconButton aria-label="Delete" icon={<FaTrash />} size="sm" colorScheme="red" onClick={() => handleDelete(material.Material_Number)} />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Material</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {Object.keys(newMaterial).map((key) => (
                <FormControl key={key}>
                  <FormLabel>{key.replace(/_/g, " ")}</FormLabel>
                  {key === "Hazardous_Indicator" ? <Checkbox isChecked={newMaterial[key]} onChange={(e) => setNewMaterial({ ...newMaterial, [key]: e.target.checked })} /> : <Input type={typeof newMaterial[key] === "number" ? "number" : "text"} value={newMaterial[key]} onChange={(e) => setNewMaterial({ ...newMaterial, [key]: e.target.value })} />}
                </FormControl>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddMaterial}>
              Add
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;
