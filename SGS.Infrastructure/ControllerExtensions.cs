﻿using System.Web.Mvc;

namespace SGS.Infrastructure
{
    public static class ControllerExtensions
    {
        public static JsonNetResult JsonNet(this Controller controller, object data)
        {
            return new JsonNetResult() { Data = data };
        }
    }
}
