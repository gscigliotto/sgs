using Impresora;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using ImpresoraV2;
using ImpresoraV3;

namespace ClienteImpresora
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
          //  Etiqueta etiqueta = new Etiqueta();
            
           // etiqueta.Nombre = textBox1.Text;
            
           // etiqueta.Codigo = textBox2.Text;

          ///  etiqueta.size = Etiqueta.Tipo.Chico;
                        
           // ImpresoraServ imp = new ImpresoraServ();

//imp.ImprimirEtiquetas(etiqueta);

            ImpresoraV2.ImpresoraV2 imp = new ImpresoraV2.ImpresoraV2();
           // imp.ImprimirEtiquietaDoble("IMP01", "Cuerda", "000123456");
        }

        private void button2_Click(object sender, EventArgs e)
        {
            
            ImpresoraV2.ImpresoraV2 imp = new ImpresoraV2.ImpresoraV2();
            List<Terminal> Terminals = imp.GetTerminalsList();

            
            imp.ImprimirEtiquietaDoble(Terminals[0],textBox1.Text, textBox2.Text);

        }

        private void button3_Click(object sender, EventArgs e)
        {
            ImpresoraV2.ImpresoraV2 Imp = new ImpresoraV2.ImpresoraV2();
            Imp.probarimg();
        }

        private void button1_Click_1(object sender, EventArgs e)
        {
            ImpresoraV2.ImpresoraV2 Imp = new ImpresoraV2.ImpresoraV2();
            Imp.GetValor("^XA^HH^XZ");
           

        }
    }
}
