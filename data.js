let G = {
    patterns: [
        {
            "name": "Abstract Factory",
            "category": "Creational",
            "description": "... is a creational design pattern that lets you produce families of related objects without specifying their concrete classes."
        },
        {
            "name": "Builder",
            "category": "Creational",
            "description": "... is a creational design pattern that lets you construct complex objects step by step. The pattern allows you to produce different types and representations of an object using the same construction code."
        },
        {
            "name": "Factory Method",
            "category": "Creational",
            "description": "... is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created."
        },
        {
            "name": "Prototype",
            "category": "Creational",
            "description": "... is a creational design pattern that lets you copy existing objects without making your code dependent on their classes."
        },
        {
            "name": "Singleton",
            "category": "Creational",
            "description": "... is a creational design pattern that lets you ensure that a class has only one instance, while providing a global access point to this instance."
        },
        {
            "name": "Adapter",
            "category": "Structural",
            "description": "... is a structural design pattern that allows objects with incompatible interfaces to collaborate."
        },
        {
            "name": "Bridge",
            "category": "Structural",
            "description": "... is a structural design pattern that lets you split a large class or a set of closely related classes into two separate hierarchies—abstraction and implementation—which can be developed independently of each other."
        },
        {
            "name": "Composite",
            "category": "Structural",
            "description": "... is a structural design pattern that lets you compose objects into tree structures and then work with these structures as if they were individual objects."
        },
        {
            "name": "Decorator",
            "category": "Structural",
            "description": "... is a structural design pattern that lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors."
        },
        {
            "name": "Facade",
            "category": "Structural",
            "description": "... is a structural design pattern that provides a simplified interface to a library, a framework, or any other complex set of classes."
        },
        {
            "name": "Flyweight",
            "category": "Structural",
            "description": "... is a structural design pattern that lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects instead of keeping all of the data in each object."
        },
        {
            "name": "Proxy",
            "category": "Structural",
            "description": "... is a structural design pattern that lets you provide a substitute or placeholder for another object. A proxy controls access to the original object, allowing you to perform something either before or after the request gets through to the original object."
        },
        {
            "name": "Chain of Responsibility",
            "category": "Behavioral",
            "description": "... is a behavioral design pattern that lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain."
        },
        {
            "name": "Command",
            "category": "Behavioral",
            "description": "... is a behavioral design pattern that turns a request into a stand-alone object that contains all information about the request. This transformation lets you parameterize methods with different requests, delay or queue a request’s execution, and support undoable operations."
        },
        {
            "name": "Interpreter",
            "category": "Behavioral",
            "description": "... is a behavioral design pattern that lets you define a grammar for a language, and then design a corresponding interpreter that uses the grammar to interpret sentences in the language."
        },
        {
            "name": "Iterator",
            "category": "Behavioral",
            "description": "... is a behavioral design pattern that lets you traverse elements of a collection without exposing its underlying representation (list, stack, tree, etc.)."
        },
        {
            "name": "Mediator",
            "category": "Behavioral",
            "description": "... is a behavioral design pattern that lets you reduce chaotic dependencies between objects. The pattern restricts direct communications between the objects and forces them to collaborate only via a mediator object."
        },
        {
            "name": "Memento",
            "category": "Behavioral",
            "description": "... is a behavioral design pattern that lets you save and restore the previous state of an object without revealing the details of its implementation."
        },
        {
            "name": "Observer",
            "category": "Behavioral",
            "description": "... is a behavioral design pattern that lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they’re observing."
        },
        {
            "name": "State",
            "category": "Behavioral",
            "description": "... is a behavioral design pattern that lets an object alter its behavior when its internal state changes. It appears as if the object changed its class."
        },
        {
            "name": "Strategy",
            "category": "Behavioral",
            "description": "... is a behavioral design pattern that lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable."
        },
        {
            "name": "Template Method",
            "category": "Behavioral",
            "description": "... is a behavioral design pattern that defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure."
        },
        {
            "name": "Visitor",
            "category": "Behavioral",
            "description": "... is a behavioral design pattern that lets you separate algorithms from the objects on which they operate."
        }
    ],

    questionsJSONRepres : [
        { 
            content:`
            public class Pasta 
            {
                protected int price;
            
                public Pasta() 
                {
                    price = 0;
                }
            
                public int GetPrice() 
                {
                    return price;
                }
            }
            
   
            public class Penne : Pasta 
            {
                public Penne() 
                {
                    price = 8;
                }
            }
            

            public class SaucePattern : Pasta 
            {
                private Pasta pasta;
            
                public SaucePattern(Pasta pasta)
                {
                    this.pasta = pasta;
                }
            
                public override int GetPrice() 
                {
                    return pasta.GetPrice() + 5;
                }
            }`,
            answer: "Decorator"
        },
        {
            content:`
            public class Request
            {
                public string Url { get; set; }
                public string Method { get; set; }
                public object Payload { get; set; }
            }
            

            public class RequestPattern
            {
                private readonly Request _request = new Request();
            
                public RequestPattern ForUrl(string url)
                {
                    _request.Url = url;
                    return this;
                }
            
                public RequestPattern UseMethod(string method)
                {
                    _request.Method = method;
                    return this;
                }
            
                public RequestPattern Payload(object payload)
                {
                    _request.Payload = payload;
                    return this;
                }
            
                public Request Create()
                {
                    return _request;
                }
            }

            // Usage
            var request = new RequestPattern()
            .ForUrl("https://example.com/api")
            .UseMethod("POST")
            .Payload(new { name = "Clary White", age = 30 })
            .Create();`,
            answer: "Builder"
        },
        {
            content:`
            public class ShoppingCart
            {
                private readonly IDiscount _discount;

                public ShoppingCart(IDiscount discount)
                {
                    _discount = discount;
                }

                public double Amount { get; private set; }

                public void SetAmount(double amount)
                {
                    Amount = amount;
                }

                public double Checkout()
                {
                    return _discount.ApplyDiscount(Amount);
            }
        }


        public interface IDiscount
        {
            double ApplyDiscount(double amount);
        }


        public class GuestDiscount : IDiscount
        {
            public double ApplyDiscount(double amount)
            {
                return amount;
            }
        }


        public class RegularDiscount : IDiscount
        {
            public double ApplyDiscount(double amount)
            {
                return amount * 0.9;
            }
        }

        
        public class PremiumDiscount : IDiscount
        {
            public double ApplyDiscount(double amount)
            {
                return amount * 0.8;
            }
        }`,
            answer: "Strategy"
        },
        {
            content:`
            public class TrafficTower
            {
                private readonly List<IAirplane> _airplanes = new List<IAirplane>();
            
                public void AddAirplane(IAirplane airplane)
                {
                    _airplanes.Add(airplane);
                }
            
                public IEnumerable<Position> RequestPositions()
                {
                    return _airplanes.Select(a => a.Position);
                }
            }
            

            public interface IAirplane
            {
                Position Position { get; }
                void RequestPositions();
            }
            

            public class Airplane : IAirplane
            {
                public Position Position { get; private set; }
                private readonly TrafficTower _trafficTower;
            
                public Airplane(Position position, TrafficTower trafficTower)
                {
                    Position = position;
                    _trafficTower = trafficTower;
                    _trafficTower.AddAirplane(this);
                }
            
                public void RequestPositions()
                {
                    var positions = _trafficTower.RequestPositions();
                    // Do something with the positions
                }
            }
            

            public class Position
            {
                public int X { get; set; }
                public int Y { get; set; }
            }`,
            answer: "Mediator"
        },
        {
            content:`
            public class Formatter
            {
                private static Formatter _instance;

                private Formatter()
                {
                }

                public static Formatter GetInstance()
                {
                    if (_instance == null)
                    {
                        _instance = new Formatter();
                    }
                    return _instance;
                }
            }`
            ,
            answer: "Singleton"
        },
        {
            content:`
            public abstract class Printer
            {
                protected Ink Ink;
            
                public Printer(Ink ink)
                {
                    Ink = ink;
                }
            
                public abstract string Print();
            }
            

            public class EpsonPrinter : Printer
            {
                public EpsonPrinter(Ink ink) : base(ink)
                {
                }
            
                public override string Print()
                {
                    return $"Printer: Epson, Ink: {Ink.Get()}";
                }
            }
            

            public class HPprinter : Printer
            {
                public HPprinter(Ink ink) : base(ink)
                {
                }
            
                public override string Print()
                {
                    return $"Printer: HP, Ink: {Ink.Get()}";
                }
            }
            

            public abstract class Ink
            {
                public abstract string Get();
            }
            

            public class AcrylicInk : Ink
            {
                public override string Get()
                {
                    return "acrylic-based";
                }
            }
            

            public class AlcoholInk : Ink
            {
                public override string Get()
                {
                    return "alcohol-based";
                }
            }`
            ,
            answer: "Bridge"
        },
        {
            content:`
            public class TreeLine
            {
                private int _index = 0;
                private readonly Tree[] _trees;
            
                public TreeLine(Tree[] t)
                {
                    this.trees = t;
                }
            
                public Tree Next()
                {
                    return this.trees[_index++];
                }
            
                public bool HasNext()
                {
                    return _index < _trees.Length;
                }
            }`
            ,
            answer: "Iterator"
        },
        {
            content:`
            interface ITicketService 
            {
                Ticket GetData(int ticketId);
            }
            

            class TicketService : ITicketService 
            {
                public Ticket GetData(int ticketId) 
                {
                    // Get data from API
                }
            }
            

            class TicketServiceWarden : ITicketService 
            {
                private TicketService _ticketService;
                private Dictionary<int, Ticket> _mostCommonTicketsById;
            
                public Ticket GetData(int ticketId) 
                {
                    if (ticketId < 1000) 
                    {
                        throw new Exception("ticket ID must be at least 1000");
                    } else if (ticketId > 9999) 
                    {
                        throw new Exception("ticket ID cannot exceed 9999");
                    }

                    if (_mostCommonTicketsById.ContainsKey(ticketId))
                    {
                        return _mostCommonTicketsById[ticketId];
                    }

                    if (_ticketService == null) 
                    {
                        _ticketService = new TicketService();
                    }
            
                    return _ticketService.GetData(ticketId);
                }
            }`,
            answer: "Proxy"
        },
        {
            content:`
            class TravelBookingSystem
            {
                private Discount _discount;
                private BookingFee _bookingFee;
                private Tax _tax;
                private Hotel _hotel;
                private Flight _flight;
            
                public TravelBookingSystem()
                {
                    _discount = new Discount();
                    _bookingFee = new BookingFee();
                    _tax = new Tax();
                    _hotel = new Hotel();
                    _flight = new Flight();
                }
            
                public double Book()
                {
                    double totalCost = _hotel.Cost + _flight.Cost;
                    totalCost = _discount.Calc(totalCost);
                    totalCost += _bookingFee.Calc(totalCost);
                    totalCost = _tax.Calc(totalCost);
            
                    return totalCost;
                }
            }
            

            class Discount
            {
                public double Calc(double value)
                {
                    if (value > 1000)
                    {
                        return value * 0.9;
                    }
                    else
                    {
                        return value;
                    }
                }
            }
            

            class BookingFee
            {
                public double Calc(double value)
                {
                    if (value > 100)
                    {
                        return 10;
                    }
                    else
                    {
                        return 0;
                    }
                }
            }
            

            class Tax
            {
                public double Calc(double value)
                {
                    return value * 1.07;
                }
            }
            

            class Hotel
            {
                public double Cost { get; } = 200;
            }
            

            class Flight
            {
                public double Cost { get; } = 500;
            }`,
            answer: "Facade"
        },
        {
            content:`
            interface IProcessor 
            {
                void process(Player player);
                void process(Enemy enemy);
            }
            

            abstract class Entity 
            {
                public abstract void accept(IProcessor processor);
            }
            
            
            class Player extends Entity 
            {
                public override void accept(IProcessor processor) 
                {
                    processor.process(this);
                }
            }
            

            class Enemy extends Entity 
            {
                public override void accept(IProcessor processor) 
                {
                    processor.process(this);
                }
            }
            

            class DamageProcessor : IProcessor 
            {
                private int damageAmount;
            
                public DamageProcessor(int damageAmount) 
                {
                    this.damageAmount = damageAmount;
                }
            
                public void process(Player player) 
                {
                    player.TakeDamage(damageAmount);
                }
            
                public void process(Enemy enemy) 
                {
                    enemy.TakeDamage(damageAmount);
                }
            }
            

            class HealthBoostProcessor : IProcessor 
            {
                private int boostAmount;
            
                public HealthBoostProcessor(int boostAmount) 
                {
                    this.boostAmount = boostAmount;
                }
            
                public void process(Player player) 
                {
                    player.BoostHealth(boostAmount);
                }
            
                public void process(Enemy enemy) 
                {
                    // Enemies don't get health boosts!
                }
            }
            
            // Usage
            Player player = new Player();
            Enemy enemy = new Enemy();
            
            DamageProcessor damageProcessor = new DamageProcessor(10);
            HealthBoostProcessor healthBoostProcessor = new HealthBoostProcessor(5);
            
            player.accept(damageProcessor);
            player.accept(healthBoostProcessor);
            
            enemy.accept(damageProcessor);
            enemy.accept(healthBoostProcessor);`,
            answer: "Visitor"
        },
        {
            content:`
            abstract class Environment
            {
                public abstract Herbivore SpawnHerbivore();
                public abstract Carnivore SpawnCarnivore();
            }
            

            class Africa : Environment
            {
                public override Herbivore SpawnHerbivore()
                {
                    return new Wildebeast();
                }
                public override Carnivore SpawnCarnivore()
                {
                    return new Lion();
                }
            }


            class America : Environment
            {
                public override Herbivore SpawnHerbivore()
                {
                    return new Bison();
                }
                public override Carnivore SpawnCarnivore()
                {
                    return new Wolf();
                }
            }
            `,
            answer: "Abstract Factory"
        },
        {
            content:`
            public class Sheep 
            {
                public string Name { get; private set; }
                public double Weight { get; private set; }
            
                public Sheep(string name, double weight) {
                    Name = name;
                    Weight = weight;
                }
            
                public Sheep Clone() {
                    return new Sheep(Name, Weight);
                }
            }`,
            answer: "Prototype"
        },
        {
            content:`
            class Tamagotchi
            {
                private IMood _mood;

                public ChangeMood(IMood _mood)
                {
                    this._mood = _mood;
                }

                public void Act()
                {
                    _mood.Act();
                }
            }


            interface IMood
            {
                void Act();
            }


            class Happy : IMood
            {
                public void Act()
                {
                    Console.WriteLine("Tama is happy");
                }
            }


            class Sad : IMood
            {
                public void Act()
                {
                    Console.WriteLine("Tama is sad");
                }
            }
                `,
            answer: "State"
        },
        {
            content:`
            class Button
            {
                public IFunctionality functionality { get; set; }
                public void Click() { functionality.Execute(); } 
            }


            class KeyboardShortcut
            {
                public IFunctionality functionality { get; set; }
                public void Press() { functionality.Execute(); }
            }


            interface IFunctionality
            {
                void Execute();
            }


            class CloseFunctionality : IFunctionality
            {
                public void Execute()
                {
                    // close window
                }
            }


            class MinimizeFunctionality : IFunctionality
            {
                public void Execute()
                {
                    // minimize window
                }
            }
            
            // Usage
            Button closeBtn = new Button(new CloseFunctionality());
            Button minimizeBtn = new Button(new MinimizeFunctionality());
            KeyBoardShortcut closeShortcut = new KeyBoardShortcut(new CloseFunctionality());

            closeBtn.Click();
            minimizeBtn.Click();
            closeShortcut.Press();`,
            answer: "Command"
        },
        {
            content:`
            public class Document {
                public object Content;
            
                public Document(object content)
                {
                    Content = content;
                }
            }
            

            public class PastDocument 
            {
                public object content;
            
                public PastDocument(object content)
                {
                    content = content;
                }
            }
            

            public class DocumentOriginator 
            {
                private object content;
            
                public void SetContent(object content)
                {
                    this.content = content;
                }
            
                public PastDocument Save()
                {
                    return new PastDocument(content);
                }
            
                public void Restore(PastDocument past)
                {
                    content = past.content;
                }
            
                public Document GetDocument()
                {
                    return new Document(content);
                }
            }
            

            public class DocumentCaretaker 
            {
                private Stack<PastDocument> pasts = new Stack<PastDocument>();
            
                public void Addpast(PastDocument past)
                {
                    pasts.Push(past);
                }
            
                public PastDocument Getpast()
                {
                    return pasts.Pop();
                }
            }`,
            answer: "Memento"
        },
        {
            content:`
            public class Sum 
            {
                private IExpr _left;
                private IExpr _right;
            
                public Sum(IExpr _left, IExpr _right) 
                {
                    this._left = _left;
                    this._right = _right;
                }
            
                public int Expr() 
                {
                    return _left.Expr() + _right.Expr();
                }
            }
           
            
            public class Min 
            {
                private IExpr _left;
                private IExpr _right;
            
                public Min(IExpr _left, IExpr _right) 
                {
                    this._left = _left;
                    this._right = _right;
                }
            
                public int Expr() 
                {
                    return _left.Expr() - _right.Expr();
                }
            }
            

            public class Num : IExpr 
            {
                private int _val;
            
                public Num(int _val) 
                {
                    this._val = _val;
                }
            
                public int Expr() 
                {
                    return _val;
                }
            }
            

            public interface IExpr 
            {
                int Expr();
            }`,
            answer: "Interpreter"
        },
        {
            content:`
            abstract class BanknoteHandler
            {
                protected BanknoteHandler nextHandler;

                public void SetNextHandler(BanknoteHandler handler)
                {
                    nextHandler = handler;
                }

                public virtual void Handle(int amount)
                {
                    if (nextHandler != null)
                    {
                        nextHandler.Handle(amount);
                    }
                }
            }


            class FiftyDollarHandler : BanknoteHandler
            {
                public override void Handle(int amount)
                {
                    if (amount >= 50)
                    {
                        int num = amount / 50;
                        Console.WriteLine($"Dispensing {num} x $50 banknote");
                        amount -= num * 50;
                    }

                    base.Handle(amount);
                }
            }


            class TwentyDollarHandler : BanknoteHandler
            {
                public override void Handle(int amount)
                {
                    if (amount >= 20)
                    {
                        int num = amount / 20;
                        Console.WriteLine($"Dispensing {num} x $20 banknote");
                        amount -= num * 20;
                    }

                    base.Handle(amount);
                }
            }


            class TenDollarHandler : BanknoteHandler
            {
                public override void Handle(int amount)
                {
                    if (amount >= 10)
                    {
                        int num = amount / 10;
                        Console.WriteLine($"Dispensing {num} x $10 banknote");
                        amount -= num * 10;
                    }

                    base.Handle(amount);
                }
            }

            // Usage
            BanknoteHandler fiftyHandler = new FiftyDollarHandler();
            BanknoteHandler twentyHandler = new TwentyDollarHandler();
            BanknoteHandler tenHandler = new TenDollarHandler();

            fiftyHandler.SetNextHandler(twentyHandler);
            twentyHandler.SetNextHandler(tenHandler);

            int amount = 120;
            fiftyHandler.Handle(amount);`,
            answer: "Chain of Responsibility"
        },
        {
            content:`
            public interface IShape
            {
                void Draw(string fillColor);
            }
        

            public class Triangle : IShape
            {
                public void Draw(string fillColor)
                {
                    Console.WriteLine("Drawing Triangle with color " + fillColor);
                }
            }
        

            public class Circle : IShape
            {
                public void Draw(string fillColor)
                {
                    Console.WriteLine("Drawing Circle with color " + fillColor);
                }
            }
        

            public class Drawing : IShape
            {
                private List<IShape> _shapes = new List<IShape>();
        
                public void Draw(string fillColor)
                {
                    foreach (IShape shape in _shapes)
                    {
                        shape.Draw(fillColor);
                    }
                }
        
                public void Add(IShape shape)
                {
                    _shapes.Add(shape);
                }
        
                public void Remove(IShape shape)
                {
                    _shapes.Remove(shape);
                }
        
                public void Clear()
                {
                    Console.WriteLine("Clearing all the shapes from drawing");
                    _shapes.Clear();
                }
            }`,
            answer: "Composite"
        },
        {
            content:`
            public class Product 
            {
                private decimal _price;
                private readonly List<IModifier> priceModifiers = new List<IModifier>();
            
                public Product() 
                {
                    this._price = 0;
                }
            
                public void SetBasePrice(decimal val) 
                {
                    this._price = val;
                    NotifyPriceModifiers();
                }
            
                public void RegisterPriceModifier(IModifier priceModifier) 
                {
                    this.priceModifiers.Add(priceModifier);
                }
            
                public void UnregisterPriceModifier(IModifier priceModifier) 
                {
                    this.priceModifiers.Remove(priceModifier);
                }
            
                private void NotifyPriceModifiers() 
                {
                    foreach (var priceModifier in this.priceModifiers) 
                    {
                        priceModifier.UpdatePrice(this);
                    }
                }
            
                public decimal GetPrice() 
                {
                    return this._price;
                }
            }
            

            public interface IModifier 
            {
                void UpdatePrice(Product product);
            }
            

            public class FeesPriceModifier : IModifier 
            {
                public void UpdatePrice(Product product) 
                {
                    product.SetBasePrice(product.GetPrice() * 1.2m);
                }
            }
            

            public class ProfitPriceModifier : IModifier 
            {
                public void UpdatePrice(Product product) 
                {
                    product.SetBasePrice(product.GetPrice() * 2m);
                }
            }`,
            answer: "Observer"
        },
        {
            content:`
            interface IAttacker 
            {
                int Attack();
            }
              

            class Soldier 
            {
                private int level;
              
                public Soldier(int level) 
                {
                  this.level = level;
                }
              
                public int Attack() 
                {
                  return this.level * 1;
                }
            }
              

            class Jedi 
            {
                private int level;
              
                public Jedi(int level) 
                {
                  this.level = level;
                }
              
                public int AttackWithSaber() 
                {
                  return this.level * 100;
                }
            }
              

            class LightSaberAttacker : IAttacker 
            {
                private Jedi jedi;
              
                public LightSaberAttacker(Jedi jedi) 
                {
                  this.jedi = jedi;
                }
              
                public int Attack() 
                {
                  return this.jedi.AttackWithSaber();
                }
            }`,
            answer: "Adapter"
        },
        {
            content:`
            public abstract class DataProcessor
            {
                public void ProcessData(string data)
                {
                    string formattedData = FormatData(data);
                    string transformedData = TransformData(formattedData);
                    StoreData(transformedData);
                }
            
                protected abstract string FormatData(string data);
                protected abstract string TransformData(string data);
                protected abstract void StoreData(string data);
            }
            

            public class CsvDataProcessor : DataProcessor
            {
                protected override string FormatData(string data)
                {
                    // Code to format CSV data
                    return formattedData;
                }
            
                protected override string TransformData(string data)
                {
                    // Code to transform CSV data
                    return transformedData;
                }
            
                protected override void StoreData(string data)
                {
                    // Code to store CSV data
                }
            }
            

            public class XmlDataProcessor : DataProcessor
            {
                protected override string FormatData(string data)
                {
                    // Code to format XML data
                    return formattedData;
                }
            
                protected override string TransformData(string data)
                {
                    // Code to transform XML data
                    return transformedData;
                }
            
                protected override void StoreData(string data)
                {
                    // Code to store XML data
                }
            }
            

            // Usage:
            DataProcessor csvProcessor = new CsvDataProcessor();
            csvProcessor.ProcessData(csvData);
            
            DataProcessor xmlProcessor = new XmlDataProcessor();
            xmlProcessor.ProcessData(xmlData);`,
            answer: "Template Method"
        },
        {
            content:`
            public class Color
            {
                public string Name { get; private set; }
            
                public Color(string name)
                {
                    Name = name;
                }
            }
            

            public class ColorCreator
            {
                private Dictionary<string, Color> colors = new Dictionary<string, Color>();
            
                public Color Create(string name)
                {
                    if (colors.ContainsKey(name))
                    {
                        return colors[name];
                    }
                    else
                    {
                        Color color = new Color(name);
                        colors.Add(name, color);
                        return color;
                    }
                }
            }`,
            answer: "Flyweight"
        },
        {
            content:`
            public abstract class Tesla 
            {
                public string Model { get; }
                public decimal Price { get; }
                public int MaxSpeed { get; }
            
                protected Tesla(string model, decimal price, int maxSpeed) 
                {
                    Model = model;
                    Price = price;
                    MaxSpeed = maxSpeed;
                }
            }
            

            public class ModelX : Tesla 
            {
                public ModelX() : base("ModelX", 108000, 300) { }
            }
            

            public class ModelS : Tesla 
            {
                public ModelS() : base("ModelS", 111000, 320) { }
            }
            

            public class TeslaCreator 
            {
                public Tesla CreateTesla(string type) 
                {
                    if (type == "ModelX") 
                    {
                        return new ModelX();
                    }
                    else if (type == "ModelS") 
                    {
                        return new ModelS();
                    }
                    else 
                    {
                        throw new ArgumentException($"Unknown Tesla model type '{type}'.");
                    }
                }
            }`,
            answer: "Factory Method"
        },
    ],
}