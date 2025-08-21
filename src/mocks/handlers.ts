// src/mocks/handlers.ts
import { graphql, HttpResponse } from 'msw';

export const handlers = [
  graphql.query('MonthlyRevenue', () => {
    return HttpResponse.json({
      data: {
        monthlyRevenue: [
          { label: '2025-05', value: 3200000 },
          { label: '2025-06', value: 2800000 },
          { label: '2025-07', value: 4100000 },
          { label: '2025-08', value: 3600000 },
        ],
      },
    });
  }),

  graphql.query('ProjectCountByStatus', () => {
    return HttpResponse.json({
      data: {
        projectCountByStatus: [
          { label: 'Todo',        value: 8 },
          { label: 'In Progress', value: 12 },
          { label: 'Review',      value: 4 },
          { label: 'Done',        value: 20 },
        ],
      },
    });
  }),
];
