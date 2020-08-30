using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebAtividadeEntrevista.Models;

namespace WebAtividadeEntrevista.ViewModels
{
    public class BeneficiarioViewModel
    {
        public List<BeneficiarioModel> listaBeneficiarios { get; set; }

        public long? ultimoIdGerado { get; set; }
    }
}