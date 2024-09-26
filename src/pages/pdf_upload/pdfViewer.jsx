import { ActionIcon, Flex, ScrollArea, Stack, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import PDF from "react-pdf-js";

export default function PdfViewer({ pdf, key, type, pageSelect, setPageSelect }) {
  const [pages, setPages] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log("[Changed Page]", page);
  }, [page]);

  const onDocumentComplete = (numPages) => {
    setPages(numPages);
  };

  const onDocumentError = (err) => {
    console.error("pdf viewer error:", err);
  };

  const onPage = (type) => {
    var newPage = type ? page + 1 : page - 1;

    if (newPage > pages) {
      newPage = 1;
    } else if (newPage < 1) {
      newPage = pages;
    }

    setPage(newPage);
  };

  return (
    <>
      <Stack h={500}>
        <div className="relative">
          <ScrollArea h={type === "multi" ? 800 : 600} w={type === "multi" ? 610 : 500} offsetScrollbars>
            <PDF key={key} file={pdf} onDocumentComplete={onDocumentComplete} onDocumentError={onDocumentError} page={page} scale={1} />
          </ScrollArea>
        </div>
        <div className="relative flex justify-center">
          <Flex justify={"center"} gap={"md"} align={"center"}>
            <ActionIcon onClick={() => onPage(0)} variant="outline" radius={"xl"}>
              <IconChevronLeft />
            </ActionIcon>
            <div>
              <span style={{ textAlign: "center" }}>
                Page {page} of {pages}
              </span>
            </div>
            <ActionIcon onClick={() => onPage(1)} variant="outline" radius={"xl"}>
              <IconChevronRight />
            </ActionIcon>
          </Flex>
          {type === "cfa" && (
            <div className="absolute right-0">
              <Tooltip label="You can select page to train" withArrow>
                <ActionIcon
                  disabled={pageSelect.includes(page)}
                  onClick={() => {
                    if (pageSelect.includes(page)) {
                      console.log("==");
                      notifications.show({
                        color: "red",
                        title: "You already selected this page",
                        // message: "You cannot select the same page again.",
                      });
                    } else {
                      let pages = [...pageSelect];
                      pages.push(page);
                      setPageSelect(pages);
                    }
                  }}
                >
                  <IconCheck size={"1rem"} />
                </ActionIcon>
              </Tooltip>
            </div>
          )}
        </div>
      </Stack>
    </>
  );
}
