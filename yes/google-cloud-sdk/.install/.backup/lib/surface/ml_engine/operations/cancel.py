# Copyright 2017 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""ml-engine operations cancel command."""
from googlecloudsdk.api_lib.ml import operations
from googlecloudsdk.calliope import base
from googlecloudsdk.command_lib.ml import flags
from googlecloudsdk.command_lib.ml import operations_util


def _AddCancelArgs(parser):
  flags.OPERATION_NAME.AddToParser(parser)


@base.ReleaseTracks(base.ReleaseTrack.BETA, base.ReleaseTrack.ALPHA)
class CancelBeta(base.SilentCommand):
  """Cancel a Cloud ML Engine operation."""

  @staticmethod
  def Args(parser):
    _AddCancelArgs(parser)

  def Run(self, args):
    return operations_util.Cancel(operations.OperationsClient('v1beta1'),
                                  args.operation)


@base.ReleaseTracks(base.ReleaseTrack.GA)
class CancelGa(base.SilentCommand):
  """Cancel a Cloud ML Engine operation."""

  @staticmethod
  def Args(parser):
    _AddCancelArgs(parser)

  def Run(self, args):
    return operations_util.Cancel(operations.OperationsClient('v1'),
                                  args.operation)
