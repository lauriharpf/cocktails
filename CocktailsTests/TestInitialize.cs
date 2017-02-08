using NUnit.Framework;

[SetUpFixture]
public class TestInitialize
{
    [OneTimeSetUp]
    public void Setup()
    {
        Effort.Provider.EffortProviderConfiguration.RegisterProvider();
    }
}
