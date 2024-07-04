interface InstanceConfiguration {
  memory_in_gb: number;
  storage_in_gb: number;
  vcpus: number;
  num_gpus: number;
  gpu_type: string;
  interconnect: string;
  vram_per_gpu_in_gb: number;
  os: string;
}
