internal class Program
{
    private static void Main(string[] args)
    {
        const double SODA = 2.00;

        const double SANDWICH = 3.60;

        const double CHIP = 2.00;

        const double TAX = 0.08;

        const double TIP = 0.02;

        int soda = 2;

        int sandwich = 2;

        int chip = 1;

        Console.WriteLine("Customer Number 1 Orders");
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
        Console.WriteLine("");

        soda = 3;

        sandwich = 2;

        chip = 3;

        Console.WriteLine("Customer Number 2 Orders");
        Console.WriteLine("\t1. {0} sodas\n\t2. {1} sandwiches\n\t3. {2} chips", soda, sandwich, chip);
        Console.WriteLine("");

        subtotal = (soda * SODA) + (sandwich * SANDWICH) +(chip * CHIP);

        Console.WriteLine("\tSubtotal: {0:C}", subtotal);

        tax = subtotal * TAX;

        Console.WriteLine("\tTax: {0:C}", tax);

        tip = subtotal * TIP;

        Console.WriteLine("\tTip: {0:C}", tip);
        Console.WriteLine("");

        total = subtotal + tax + tip;

        Console.WriteLine("\tTotal: {0:C}", total);        
    }
}