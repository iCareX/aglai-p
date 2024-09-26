import { ActionIcon, Box, Card, CopyButton, Flex, List, ListItem, Paper, rem, ScrollArea, SimpleGrid, Stack, Text, ThemeIcon, Tooltip } from "@mantine/core";
import { IconBook2, IconBrandCucumber, IconCheck, IconCircleCheck, IconCircleX, IconCopy, IconListNumbers, IconMoodEmpty, IconNumber, IconPageBreak, IconReceiptOff, IconSortDescendingNumbers, IconTextSize } from "@tabler/icons-react";
import { useRef, useState } from "react";

export default function ShowResult(props) {
  const viewport = useRef(null);
  const { data } = props;

  const scrollRefs = {
    firstGroup: useRef(null),
    secondGroup: useRef(null),
  };

  const handleLabel = (str) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const groups = {
    firstGroup: [
      "immobile_sito_in",
      "esecuzione_immobiliare_n",
      "individuazione_immobile",
      "identificazione_catastale",
      "descrizione_immobile",
      "difformita",
      "vetusta_immobile",
      "occupazione_bene",
      "data_asta",
      "valore_immobiliare",
      "base_asta",
      "offerta_minima",
      "rilancio_offerta",
      "cauzione",
      "tipologia_immobile",
      "sanatorie_lavori_da_eseguire",
      "costi_sanatoria",
      "referente",
      "piena_proprieta",
      "spese_condominiali",
      "descrizione_infissi",
      "descrizione_pavimenti",
      "descrizione_riscaldamento",
      "descrizione_caldaia",
      "descrizione_porta",
      "videosorveglianza",
      "servizi",
      "esposizione",
      "ascensore",
      "pannelli_fotovoltaici",
      "impianto_raffrescamento",
      "impianto_idrico_sanitario",
      "tende_da_sole",
      "impianto_elettrico",
      "finiture_esterne",
      "piani",
    ],
    secondGroup: [
      "immobile_sito_in_source",
      "esecuzione_immobiliare_n_source",
      "individuazione_immobile_source",
      "identificazione_catastale_source",
      "descrizione_immobile_source",
      "difformita_source",
      "vetusta_immobile_source",
      "occupazione_bene_source",
      "data_asta_source",
      "valore_immobiliare_source",
      "base_asta_source",
      "offerta_minima_source",
      "rilancio_offerta_source",
      "cauzione_source",
      "tipologia_immobile_source",
      "sanatorie_lavori_da_eseguire_source",
      "costi_sanatoria_source",
      "referente_source",
      "piena_proprieta_source",
      "spese_condominiali_source",
      "descrizione_infissi_source",
      "descrizione_pavimenti_source",
      "descrizione_riscaldamento_source",
      "descrizione_caldaia_source",
      "descrizione_porta_source",
      "videosorveglianza_source",
      "servizi_source",
      "esposizione_source",
      "ascensore_source",
      "pannelli_fotovoltaici_source",
      "impianto_raffrescamento_source",
      "impianto_idrico_sanitario_source",
      "tende_da_sole_source",
      "impianto_elettrico_source",
      "finiture_esterne_source",
      "piani_source",
    ],
  };

  const renderGroup = (group, groupName, color) => {
    return (
      <Box>
        {group.map((item, index) => (
          <div className="mt-3" key={index}>
            <Flex justify={"space-between"} align={"center"}>
              <Text color={color} fw={500}>
                {handleLabel(item)}
              </Text>
              <CopyButton value={data[item]}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
                    <ActionIcon color={copied ? "teal" : "gray"} variant="subtle" onClick={copy}>
                      {copied ? <IconCheck style={{ width: rem(16) }} /> : <IconCopy style={{ width: rem(16) }} />}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Flex>
            <Paper withBorder radius={"sm"} px={"sm"} py={"xs"} mt={4}>
              <Text color={data[item] ? "" : "gray"} fs={data[item] ? "" : "italic"}>
                {data[item] ? data[item] : " None Data"}
              </Text>
            </Paper>
          </div>
        ))}
      </Box>
    );
  };

  const [selected, setSelected] = useState();
  const [clicked, setClicked] = useState();
  const [hoverIndex, setHoverIndex] = useState(-1);

  const calculateHeight = () => `calc(100vh - 580px)`;

  const handleScrollMove = (group) => {
    viewport.current?.scrollTo({ top: scrollRefs[group].current.offsetTop, behavior: "smooth" });
  };

  const handleShowMore = () => {

  }

  return (
    <>
      {/* <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {Object.keys(groups).map((item, index) => {
          return (
            <Card
              withBorder
              shadow="sm"
              radius={"sm"}
              onClick={() => {
                setSelected(item);
                handleScrollMove(item);
                setClicked(index);
              }}
              p={0}
              onMouseOver={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(-1)}
              style={{ borderColor: hoverIndex === index || clicked === index ? "#228be6" : "" }}
            >
              <ScrollArea h={380} p={"sm"}>
                <Flex gap={"sm"} wrap={"wrap"}>
                  {groups[item].map((subItem, subIndex) => {
                    return (
                      <Text key={subIndex} fw={500} color={data[subItem] === undefined || data[subItem] === "<UNKNOWN>" ? "red" : "green"}>
                        {handleLabel(subItem)},
                      </Text>
                    );
                  })}
                </Flex>
              </ScrollArea>
            </Card>
          );
        })}
      </SimpleGrid>
      <ScrollArea mt={"sm"} viewportRef={viewport} pr={"sm"} scrollbarSize={8} style={{ height: calculateHeight() }}>
        <div ref={scrollRefs.firstGroup}>{renderGroup(groups.firstGroup, "First Group", "teal")}</div>
        <div ref={scrollRefs.secondGroup}>{renderGroup(groups.secondGroup, "Second Group", "#228be6")}</div>
      </ScrollArea> */}
      <ScrollArea h={760} offsetScrollbars>
      <SimpleGrid cols={{base: 1, md: 2, lg: 3}}>
  {
    Object.entries(data).map(([key, item], index) => {
      return (
        <Paper withBorder radius={'sm'} p={'sm'} shadow="sm">
          <Flex direction={'column'} h={'100%'} gap={'md'} justify={'space-between'} key={index}>
            <Box>
            <Text fw={700} size="md" tt={'uppercase'} lin>{key}</Text>
            {item.source_text && <Text fw={400} mt={'md'}>{item.source_text}</Text>}
            </Box>
            <Box mt={'sm'} h={item.sources && item.sources.length > 0 ? "" : "100%"}>
              {
                item.sources && item.sources.length > 0 && <Flex justify={'start'} align={'start'} gap={4} mb={'xs'}>
                <IconTextSize color="green"/>
                <Text fw={500}>{item.value}</Text>
              </Flex>
              }
            {
              item.sources && item.sources.length > 0 ? item.sources.map((sourceItem, sourceIndex) => {
                return (
                  <Flex key={sourceIndex} align="center" justify={'space-between'}>
                    <Flex align={'center'} gap={4}>
                      <IconBook2 color="green"/>
                      <Text size="sm" fw={500}>{sourceItem.source}</Text>
                      {/* <span className="text-gray-500">({sourceItem.page_num} pages)</span> */}
                    </Flex>
                    <Flex align={'center'} gap={4}>
                      <Text fw={500} size="sm" color="gray">Pages:</Text>
                      <Text size="sm" fw={500}>{sourceItem.page_num}</Text>
                    </Flex>
                  </Flex>
                )
              }) : (<Flex w={'100%'} h={'100%'} align={'center'} justify={'center'}>
                <Text className="flex items-center gap-2" fw={500} fs={'italic'} size="28px" color="gray" ><IconReceiptOff color="gray" size={'2.6rem'}/>No Data...</Text>
              </Flex>)
            }
            
            </Box>
          </Flex>
        </Paper>
      );
    })
  }
      </SimpleGrid>
      </ScrollArea>
    </>
  );
}
