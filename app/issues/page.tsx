import { prisma } from "@/prisma/client";
import Pagination from "../components/Pagination";
import { Status } from "../generated/prisma";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  
  const statuses = Object.values(Status);
  const sParams = await searchParams;
  const status = statuses.includes(sParams.status) ? sParams.status : undefined;
  const where = {status}
  const orderBy = columnNames
    .includes(sParams.orderBy)
    ? { [sParams.orderBy]: "asc" }
    : undefined;

    const page = parseInt(sParams.page) || 1
    const pageSize = 10

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({ where})
  return (
    <Flex direction='column' gap='3'>
      <IssueActions />
      <IssueTable searchParams={sParams} issues={issues} />
      <Pagination currentPage={page} itemCount={issueCount} pageSize={pageSize} />
    </Flex>
  );
};
export const dynamic = "force-dynamic";

export default IssuesPage;
