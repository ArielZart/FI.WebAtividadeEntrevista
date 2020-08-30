using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;
using WebAtividadeEntrevista.ViewModels;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiariosController : Controller
    {
        // GET: Beneficiarios
        [HttpGet]
        public ActionResult Modal()
        {
            var viewmodel = new BeneficiarioViewModel();
            viewmodel.listaBeneficiarios = new List<BeneficiarioModel>();
            viewmodel.ultimoIdGerado = null;

            return PartialView("Modal", viewmodel);
        }

        [HttpPost]
        public ActionResult Modal(BeneficiarioViewModel beneficiarioViewModel)
        {
            var viewmodel = new BeneficiarioViewModel();
            viewmodel.listaBeneficiarios = beneficiarioViewModel.listaBeneficiarios;
            viewmodel.ultimoIdGerado = beneficiarioViewModel.ultimoIdGerado;

            return PartialView("Modal", viewmodel);
        }
    }
}