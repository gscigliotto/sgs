using System.Web;
using System.Web.Optimization;

namespace SGS.MvcWebApp
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();


            bundles.Add(new StyleBundle("~/Content/css/styles")
               .Include("~/Content/css/bootstrap.css")
               .Include("~/Content/css/bootstrap-datepicker.css")
               .Include("~/Content/css/font-awesome.min.css")
               .Include("~/Content/css/smartadmin-production.css")
               .Include("~/Content/css/smartadmin-skins.css")
               .Include("~/Content/css/ng-grid.min.css")
               .Include("~/Content/css/demo.css")
               .Include("~/Content/css/Site.css"));

            bundles.Add(new ScriptBundle("~/bundles/scripts/basicScripts")
                .Include("~/Scripts/libs/jquery-2.0.2.min.js")
                .Include("~/Scripts/libs/jquery-ui-1.10.3.min.js")
                .Include("~/Scripts/plugin/jquery-validate/jquery.validate.min.js")
                .Include("~/Scripts/plugin/jquery-form/jquery-form.min.js")
                .Include("~/Scripts/plugin/pace/pace.min.js")
                .Include("~/Scripts/plugin/easy-pie-chart/jquery.easy-pie-chart.min.js")
                .Include("~/Scripts/plugin/sparkline/jquery.sparkline.min.js")
                .Include("~/Scripts/plugin/masked-input/jquery.maskedinput.min.js")
                .Include("~/Scripts/plugin/select2/select2.min.js")
                .Include("~/Scripts/plugin/bootstrap-slider/bootstrap-slider.min.js")
                .Include("~/Scripts/plugin/msie-fix/jquery.mb.browser.min.js")
                .Include("~/Scripts/plugin/fastclick/fastclick.js")
                .Include("~/Scripts/plugin/masked-input/jquery.maskedinput.min.js")
                .Include("~/Scripts/smartwidgets/jarvis.widget.min.js")
                .Include("~/Scripts/notification/SmartNotification.min.js")
                .Include("~/Scripts/bootstrap/bootstrap.min.js")
                .Include("~/Scripts/bootstrap/bootstrap-datepicker.js")
                .Include("~/Scripts/app.js")
                );

            //bundles.Add(new ScriptBundle("~/bundles/scripts/appScripts")            
            //   .Include("~/Scripts/angularJs/angular-v1.2.2.min.js")
            //   .Include("~/Scripts/angularJs/angular-route.min.js")
            //   .Include("~/Scripts/angularJs/ng-grid-2.0.7.min.js")
            //   .Include("~/Scripts/angularJs/angular-strap.min.js")
            //   .Include("~/Scripts/angularJs/angular-sanitize.js")
            //   .Include("~/Scripts/angularJs/ui-utils.min.js")
            //   .Include("~/Scripts/app/shared/filters.js")
            //   );
        }
    }
}