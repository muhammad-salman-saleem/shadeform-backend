import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateInstanceDTO } from './dto/create-instance.dto';

import { InstanceService } from './instance.service';
import { Instance as InstanceModel } from '@prisma/client';
import { Prisma } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';

import { v4 as uuidv4 } from 'uuid';

@Controller()
export class InstanceController {
  constructor(private readonly instanceService: InstanceService) {}

  @Get('instance/:id/info')
  async getInstanceById(@Param('id') id: string): Promise<InstanceModel> {
    return this.instanceService.getOneInstance({ id });
  }

  @Get('instances')
  async getInstances(): Promise<InstanceModel[]> {
    //filter by active instances
    return this.instanceService.getInstances();
  }

  @Get('instances/types')
  async getInstancesTypes(): Promise<InstanceModel[]> {
    const axiosConfig = {
      headers: { 'X-Api-Key': process.env.API_KEY },
    };

    const res = await axios.get(
      'https://api.shadeform.ai/v1/instances/types',
      axiosConfig,
    );

    return res.data;
  }

  @Post('instances/create')
  async createInstance(@Body() instanceInput: CreateInstanceDTO) {
    const {
      cloud,
      region,
      shade_instance_type,
      shade_cloud,
      name,
      launch_configuration,
      os,
    } = instanceInput;

    const axiosConfig = {
      headers: { 'X-Api-Key': process.env.API_KEY },
      params: {
        shade_instance_type,
        cloud,
      },
    };

    const res = await axios.get(
      'https://api.shadeform.ai/v1/instances/types',
      axiosConfig,
    );

    const { cloud_instance_type, hourly_price } = res.data.instance_types[0];

    const cloud_assigned_id = uuidv4();
    const ip = uuidv4();
    const ssh_user = 'shadeform';
    const ssh_port = 22;
    const status = 'active';
    const cost_estimate = 100;

    const {
      memory_in_gb,
      storage_in_gb,
      vcpus,
      num_gpus,
      gpu_type,
      interconnect,
      vram_per_gpu_in_gb,
    } = res.data.instance_types[0].configuration;

    const configuration: InstanceConfiguration = {
      memory_in_gb,
      storage_in_gb,
      vcpus,
      num_gpus,
      gpu_type,
      interconnect,
      vram_per_gpu_in_gb,
      os,
    };

    const data: Prisma.InstanceCreateInput = {
      cloud,
      region,
      shade_instance_type,
      shade_cloud,
      name,
      launch_configuration: launch_configuration,
      configuration: JSON.stringify(configuration),
      cloud_instance_type,
      cloud_assigned_id,
      ip,
      ssh_user,
      ssh_port,
      status,
      cost_estimate,
      hourly_price,
    };

    return this.instanceService.createInstance(data);
  }

  // @Delete('instance/:id')
  // async deleteInstance(@Param('id') id: string): Promise<InstanceModel> {
  //   return this.instanceService.deleteInstance({ id });
  // }
}
