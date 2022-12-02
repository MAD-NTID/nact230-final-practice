internal class Program
{
    private static void Main(string[] args)
    {
        const double SODA = 2.00;

        const double SANDWICH = 3.60;

        const double CHIP = 2.00;

        const double TAX = 0.08;

        const double TIP = 0.02;

        Console.Write("How many sodas would you like to buy? ");

        int soda = int.Parse(Console.ReadLine());

        Console.Write("How many sandwiches would you like to order? ");

        int sandwich = int.Parse(Console.ReadLine());

        Console.Write("How many chips would you like to buy? ");

        int chip = int.Parse(Console.ReadLine());

        Console.WriteLine("Customer Orders");
        Console.WriteLine("\t1. {0} sodas\n\t2. {1} sandwiches\n\t3. {2} chips", soda, sandwich, chip);
        Console.WriteLine("");

        double subtotal = (soda * SODA) + (sandwich * SANDWICH) + (chip * CHIP);

        Console.WriteLine("\tSubtotal: {0:C}", subtotal);

        double tax = subtotal * TAX;

        Console.WriteLine("\tTax: {0:C}", tax);

        double tip = subtotal * TIP;

        Console.WriteLine("\tTip: {0:C}", tip);
        Console.WriteLine("");

        double total = subtotal + tax + tip;

        Console.WriteLine("\tTotal: {0:C}", total);

     }
}