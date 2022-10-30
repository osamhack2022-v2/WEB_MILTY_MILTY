export const topTableColumns = [
  {
    title: "직책",
    dataIndex: "position",
    key: "position",
    align: "center",
  },
  {
    title: "관등성명",
    dataIndex: "officialStatement",
    key: "official-statement",
    align: "center",
  },
];

export const topTabledata = [
  {
    key: "1",
    position: "당직 사령",
    officialStatement: "대위 홍길동",
  },
  {
    key: "2",
    position: "당직 부관",
    officialStatement: "AAA",
  },
  {
    key: "3",
    position: "상황병",
    officialStatement: "BBB",
  },
];

export const middleTableColumns = [
  {
    title: "시간",
    dataIndex: "time",
    key: "time",
    align: "center",
    render: (_, { time_start, time_end }) => {
      return <span>{time_start} - {time_end}</span>;
    }
  },
  {
    title: "근무자",
    dataIndex: "user_name",
    key: "user_name",
    align: "center",
  },
  // {
  //   title: "부사수",
  //   dataIndex: "mentee",
  //   key: "mentee",
  //   align: "center",
  // },
];

export const middleTabledata = [
  {
    key: "1",
    period: "",
    mentor: "",
    mentee: "",
  },
  {
    key: "2",
    period: "",
    mentor: "",
    mentee: "",
  },

  {
    key: "3",
    period: "",
    mentor: "",
    mentee: "",
  },
  {
    key: "4",
    period: "",
    mentor: "",
    mentee: "",
  },
  {
    key: "5",
    period: "",
    mentor: "",
    mentee: "",
  },
  {
    key: "6",
    period: "",
    mentor: "",
    mentee: "",
  },
];

export const bottomTableColumns = [
  {
    title: "시간",
    dataIndex: "peridd",
    key: "period",
    align: "center",
  },
  {
    title: "관등성명",
    dataIndex: "officialStatement",
    key: "official-statement",
    align: "center",
  },
];

export const bottomTabledata = [
  {
    key: "1",
    period: "",
    mentor: "",
    mentee: "",
  },
  {
    key: "2",
    period: "",
    mentor: "",
    mentee: "",
  },

  {
    key: "3",
    period: "",
    mentor: "",
    mentee: "",
  },
  {
    key: "4",
    period: "",
    mentor: "",
    mentee: "",
  },
  {
    key: "5",
    period: "",
    mentor: "",
    mentee: "",
  },
  {
    key: "6",
    period: "",
    mentor: "",
    mentee: "",
  },
];
