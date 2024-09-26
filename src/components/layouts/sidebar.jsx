import { Box, Flex, NavLink, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainSidebar(props) {
  const { colorScheme } = useMantineColorScheme();
  const navigate = useNavigate();

  const [navList, setNavList] = useState([
    {
      type: "Agents",
      menu: [
        {
          label: "AGL AI",
          link: "pdf_upload",
        },
      ],
    },
    {
      type: "History",
      menu: [
        // {
        //   label: "what is your name",
        //   link: "1",
        // },
        // {
        //   label: "I don't understand what you say",
        //   link: "2",
        // },
        // {
        //   label: "test",
        //   link: "5",
        // },
      ],
    },
  ]);

  return (
    <Box h={"100%"} w={420} p={"xs"} className="border-r-[1px] sm:block hidden">
      <Flex direction={"column"} align={"start"} gap={"md"} mt={"sm"}>
        {navList.map((item, index) => {
          return (
            <Stack key={index} w={"100%"}>
              <Text size="sm" fw={700} mb={-10}>
                {item.type}
              </Text>
              {item?.menu.map((subItem, subIndex) => {
                return (
                  <NavLink
                    label={subItem.label}
                    key={subIndex}
                    styles={{
                      label: {
                        fontSize: "16px",
                      },
                      root: {
                        backgroundColor: window.location.href.includes(subItem.link) ? (colorScheme === "light" ? "#F4F4F5" : "#333337") : "",
                        border: window.location.href.includes(subItem.link) ? (colorScheme === "light" ? "1px solid #E4E4E7" : "") : "",
                        borderRadius: "8px",
                      },
                    }}
                    onClick={() => navigate(subItem.link)}
                  />
                );
              })}
            </Stack>
          );
        })}
        {/* {chat.map((item, index) => {
          return (
            <Flex
              align={"center"}
              justify={"space-between"}
              p={"xs"}
              key={index}
              className={`truncate text-start ${item.id.toString() === id ? " bg-[#F4F4F5] border-[#E4E4E7] border rounded-md" : ""}`}
            >
              <Text className="truncate text-start" onClick={() => navigate(`/${item.id}`)}>
                {item.title}
              </Text>
              <Flex>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <IconDotsVertical color="gray" size={"1rem"} className="hover:cursor-pointer" />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
                      onClick={() =>
                        modals.openContextModal({
                          modal: "chatTitleEdit",
                          title: "Update Title",
                          centered: true,
                          innerProps: {
                            setTitleEdit,
                            chatId: item.id,
                            chatTitle: item.title,
                          },
                          styles: {
                            content: {
                              minWidth: "600px",
                            },
                          },
                        })
                      }
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconUpload style={{ width: rem(14), height: rem(14) }} />}
                      onClick={() =>
                        modals.openContextModal({
                          modal: "chatShare",
                          title: "Share link to Chat",
                          centered: true,
                          innerProps: {},
                          styles: {
                            content: {
                              minWidth: "600px",
                            },
                          },
                        })
                      }
                    >
                      Share
                    </Menu.Item>
                    <Menu.Item
                      color="red"
                      leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                      onClick={() =>
                        modals.openContextModal({
                          modal: "chatDelete",
                          title: "Delete Chat Session",
                          centered: true,
                          innerProps: { chatId: item.id },
                          styles: {
                            content: {
                              minWidth: "600px",
                            },
                          },
                        })
                      }
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Flex>
            </Flex>
          );
        })} */}
      </Flex>
    </Box>
  );
}
