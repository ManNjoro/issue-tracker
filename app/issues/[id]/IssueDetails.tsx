import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@/app/generated/prisma";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({issue}: {issue: Issue}) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap={"3"} my={"2"}>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
