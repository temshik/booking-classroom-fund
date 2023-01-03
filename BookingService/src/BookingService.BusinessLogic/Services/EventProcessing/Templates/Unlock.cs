using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookingService.BusinessLogic.Services.EventProcessing.Templates
{
    public class Unlock : EventTemplate
    {
        public override void ExecuteWorkspaceUpdate(IBookService bookingService, int workspaceId)
        {
            bookingService.ExecuteUpdateAsync(workspaceId, true);
        }
    }
}
