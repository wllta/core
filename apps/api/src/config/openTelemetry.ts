import { opentelemetry } from '@elysiajs/opentelemetry'
import { Elysia } from 'elysia'

import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto'
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node'

const metricReader = new PeriodicExportingMetricReader({
  exporter: new OTLPMetricExporter(),
  exportIntervalMillis: 1000,
})

export const openTelemetryPlugin = new Elysia().use(
  opentelemetry({
    spanProcessors: [new BatchSpanProcessor(new OTLPTraceExporter())],
    metricReader,
    serviceName: 'wa-api',
  }),
)
