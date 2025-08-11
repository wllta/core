import { opentelemetry } from '@elysiajs/opentelemetry'
import { Elysia } from 'elysia'

import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto'
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics'
import { PgInstrumentation } from '@opentelemetry/instrumentation-pg'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node'

// import { env } from '@config/env'

const metricReader = new PeriodicExportingMetricReader({
  exporter: new OTLPMetricExporter(),
  exportIntervalMillis: 1000,
})

export const openTelemetryPlugin = new Elysia({
  name: 'wa-open-telemetry',
}).use(
  opentelemetry({
    instrumentations: [new PgInstrumentation()],
    spanProcessors: [
      new BatchSpanProcessor(
        new OTLPTraceExporter(
          // {
          //   url: 'https://api.axiom.co/v1/traces',
          //   headers: {
          //     Authorization: `Bearer ${env.AXIOM_TOKEN}`,
          //     'X-Axiom-Dataset': env.AXIOM_DATASET_NAME,
          //   },
          // }
        ),
      ),
    ],
    metricReader,
    serviceName: 'wa-api',
  }),
)
