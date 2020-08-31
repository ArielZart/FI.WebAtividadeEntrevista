using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
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
            viewmodel.listaBeneficiarios = new List<Beneficiario>();

            return PartialView("Modal", viewmodel);
        }

        [HttpPost]
        public ActionResult Modal(BeneficiarioViewModel beneficiarioViewModel)
        {
            var viewmodel = new BeneficiarioViewModel();
            if (beneficiarioViewModel.listaBeneficiarios != null)
            {
                viewmodel.listaBeneficiarios = beneficiarioViewModel.listaBeneficiarios;
            }
            else
            {
                viewmodel.listaBeneficiarios = new List<Beneficiario>();
            }


            return PartialView("Modal", viewmodel);
        }

        [HttpGet]
        public ActionResult Listar(long id)
        {
            BoBeneficiario bb = new BoBeneficiario();

            List<Beneficiario> beneficiarios = bb.Listar(id);

            var viewmodel = new BeneficiarioViewModel();
            viewmodel.listaBeneficiarios = beneficiarios;

            return PartialView("Modal", viewmodel);
        }        

        [HttpPost]
        public JsonResult Incluir(List<Beneficiario> lista)
        {
            if(lista.Count > 0)
            {
                BoBeneficiario bb = new BoBeneficiario();
                foreach (Beneficiario item in lista)
                {
                    bb.Incluir(item);
                }

                return Json("Beneficiarios cadastrados com sucesso.");
            }

            return Json("Sem beneficiarios a serem cadastrados.");
        }

        [HttpPost]
        public JsonResult Alterar(List<Beneficiario> lista)
        {
            if(lista != null)
            {
                BoBeneficiario bb = new BoBeneficiario();
                foreach (Beneficiario item in lista)
                {
                    if (item.Id == -1)
                    {
                        bb.Incluir(item);
                    }
                    else
                    {
                        bb.Alterar(item);
                    }
                }

                return Json("Beneficiarios alterados/criados com sucesso.");
            }

            return Json("Sem beneficiarios a serem alterados.");
        }

        [HttpPost]
        public JsonResult Excluir(int[] lista)
        {
            if (lista != null)
            {
                BoBeneficiario bb = new BoBeneficiario();
                foreach (var item in lista)
                {
                    bb.Excluir(item);
                }

                return Json("Beneficiarios excluidos com sucesso.");
            }

            return Json("Sem beneficiarios a serem excluidos.");
        }
    }
}