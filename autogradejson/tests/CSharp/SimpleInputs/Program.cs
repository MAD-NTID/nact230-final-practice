// See https://aka.ms/new-console-template for more information
Console.Write("Enter your name:");
string name = Console.ReadLine();


Console.Write("\nEnter your age:");
int age;

bool result = int.TryParse(Console.ReadLine(), out age);
switch(result){
    case true:
        int fiveYearsAge = age + 5;
        Console.WriteLine("Hello " + name);
        Console.WriteLine($"You are {age} and in 5 years time you will be {fiveYearsAge}");
        break;
    default:
        Console.WriteLine("Please enter a valid age!");
        break;
}