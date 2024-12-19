import { 
  ActionIcon, 
  Box, 
  Card, 
  CopyButton, 
  Flex, 
  Paper, 
  ScrollArea, 
  SimpleGrid, 
  Text, 
  ThemeIcon, 
  Tooltip 
} from "@mantine/core";
import { 
  IconBook2, 
  IconCheck, 
  IconCopy, 
  IconReceiptOff, 
  IconTextSize 
} from "@tabler/icons-react";
import { useRef, useState } from "react";

export default function ShowResult(props) {
  const { data } = props;
  const viewport = useRef(null);


  const filteredData = Object.entries(data).filter(([key]) => 
  key.toLowerCase().includes('lotto')
);


  const handleLabel = (str) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Renderizza un singolo lotto
  const renderLotDetails = (lotId, lotData) => {
    return Object.entries(lotData).map(([fieldName, fieldData]) => {
      if (typeof fieldData === 'object' && fieldData !== null) {
        return (
          <Paper withBorder radius={'sm'} p={'sm'} shadow="sm" key={`${lotId}-${fieldName}`}>
            <Flex direction={'column'} h={'100%'} gap={'md'} justify={'space-between'}>
              {/* Header con nome campo e pulsante copia */}
              <Flex justify="space-between" align="center">
                <Text fw={700} size="md" tt={'uppercase'}>{handleLabel(fieldName)}</Text>
                <CopyButton value={fieldData.value || ''}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? "Copiato" : "Copia valore"} withArrow position="left">
                      <ActionIcon 
                        color={copied ? "teal" : "gray"} 
                        variant="subtle" 
                        onClick={copy}
                        disabled={!fieldData.value}
                      >
                        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              </Flex>

              {/* Contenuto */}
              <Box>
                {/* Valore estratto */}
                {fieldData.value && (
                  <Flex justify={'start'} align={'start'} gap={4} mb={'xs'}>
                    <IconTextSize color="green" size={18}/>
                    <Text fw={500}>{fieldData.value}</Text>
                  </Flex>
                )}

                {/* Testo sorgente */}
                {fieldData.source_text && (
                  <Paper withBorder radius="sm" p="xs" bg="gray.0" mb="xs">
                    <Text size="sm" color="dimmed">Testo originale:</Text>
                    <Text size="sm">{fieldData.source_text}</Text>
                  </Paper>
                )}

                {/* Fonti */}
                {fieldData.sources && fieldData.sources.length > 0 ? (
                  <Box>
                    <Text size="sm" fw={500} color="dimmed" mb="xs">Fonti:</Text>
                    {fieldData.sources.map((source, index) => (
                      <Flex 
                        key={index} 
                        align="center" 
                        justify={'space-between'}
                        py={4}
                        sx={(theme) => ({
                          borderBottom: index !== fieldData.sources.length - 1 ? 
                            `1px solid ${theme.colors.gray[2]}` : 'none'
                        })}
                      >
                        <Flex align={'center'} gap={4}>
                          <IconBook2 color="green" size={18}/>
                          <Text size="sm" fw={500}>{source.source}</Text>
                        </Flex>
                        <Flex align={'center'} gap={4}>
                          <Text fw={500} size="sm" color="gray">Pagina:</Text>
                          <Text size="sm" fw={500}>{source.page_num}</Text>
                        </Flex>
                      </Flex>
                    ))}
                  </Box>
                ) : (
                  <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'} py="xl">
                    <Text className="flex items-center gap-2" fw={500} fs={'italic'} size="lg" color="dimmed">
                      <IconReceiptOff size={24}/>Nessun dato disponibile
                    </Text>
                  </Flex>
                )}
              </Box>
            </Flex>
          </Paper>
        );
      }
      return null;
    });
  };

  return (
    <ScrollArea h={760} offsetScrollbars>
      <SimpleGrid cols={{base: 1, md: 2, lg: 3}} spacing="md">
        {filteredData.map(([lotId, lotData]) => (
          <Box key={lotId}>
            {/* Se ci sono più lotti, mostra l'intestazione del lotto */}
            {filteredData.length > 1 && (
              <Card withBorder mb="md" radius="sm">
                <Text fw={700} size="lg">{handleLabel(lotId)}</Text>
              </Card>
            )}
            {renderLotDetails(lotId, lotData)}
          </Box>
        ))}
      </SimpleGrid>
